# -*- coding: utf-8 -*-
"""
Sparse Memory System — 轻量稀疏记忆
Inspired by FadeMem (arXiv:2601.18642) + CrewAI Memory
三层: HOT(< 0.7 importance, fast decay) → WARM(≥ 0.7) → COLD(archive)

核心:
  - remember(text, importance, scope, metadata) → 存记忆
  - recall(query, limit, scope) → 综合打分召回
  - forget(scope) → 按scope删除
  - decay() → 衰减+清理
  - extract(raw_text) → LLM自动抽取+评分

不用外部API也能跑（核心存储+评分全本地）
有Ollama → 用nomic-embed-text做embedding相似度
有硅基流动API → extract()自动抽取记忆
"""

import sqlite3
import json
import time
import uuid
import os
import math
from datetime import datetime, timedelta
from typing import Optional

DB_PATH = os.path.join(os.path.dirname(__file__), "memory", "memory.db")
os.makedirs(os.path.dirname(DB_PATH), exist_ok=True)

# --- DB init ---
def init_db():
    conn = sqlite3.connect(DB_PATH)
    c = conn.cursor()
    c.execute("""
        CREATE TABLE IF NOT EXISTS memories (
            id TEXT PRIMARY KEY,
            content TEXT NOT NULL,
            importance REAL DEFAULT 0.5,
            scope TEXT DEFAULT 'global',
            metadata TEXT DEFAULT '{}',
            created_at REAL,
            last_accessed REAL,
            access_count INTEGER DEFAULT 0,
            layer TEXT DEFAULT 'warm'
        )
    """)
    c.execute("CREATE INDEX IF NOT EXISTS idx_scope ON memories(scope)")
    c.execute("CREATE INDEX IF NOT EXISTS idx_importance ON memories(importance)")
    conn.commit()
    conn.close()

init_db()

# --- Config ---
IMPORTANCE_THRESHOLD = 0.7
DECAY_THRESHOLD = 0.15
DECAY_RATE = 0.95
RECENCY_HALF_LIFE_DAYS = 7

# --- Ollama embedding (optional) ---
_OLLAMA_URL = os.environ.get("OLLAMA_URL", "http://localhost:11434")
_OLLAMA_EMBED_MODEL = os.environ.get("OLLAMA_EMBED_MODEL", "nomic-embed-text")
_embedding_cache = {}

def _get_embedding(text: str) -> Optional[list]:
    try:
        import urllib.request
        data = json.dumps({"model": _OLLAMA_EMBED_MODEL, "input": text}).encode()
        req = urllib.request.Request(
            f"{_OLLAMA_URL}/api/embeddings",
            data=data,
            headers={"Content-Type": "application/json"}
        )
        with urllib.request.urlopen(req, timeout=10) as resp:
            result = json.loads(resp.read())
            return result.get("embedding")
    except Exception:
        return None

def _cosine(vec1: list, vec2: list) -> float:
    try:
        dot = sum(a*b for a,b in zip(vec1, vec2))
        norm = (sum(a*a for a in vec1) ** 0.5) * (sum(b*b for b in vec2) ** 0.5)
        return dot / norm if norm > 0 else 0.5
    except Exception:
        return 0.5

def _time_weight(ts: float) -> float:
    age_days = (time.time() - ts) / 86400
    return math.exp(-0.693 * age_days / RECENCY_HALF_LIFE_DAYS)

def _composite_score(importance: float, last_accessed: float, access_count: int, v_score: float = 0.5) -> float:
    recency = _time_weight(last_accessed)
    access_boost = min(access_count / 20.0, 0.3)
    return v_score * 0.4 + recency * 0.3 + (importance + access_boost) * 0.3

# --- Core API ---

def remember(text: str, importance: float = 0.5, scope: str = "global", metadata: dict = None) -> str:
    now = time.time()
    layer = "warm" if importance >= IMPORTANCE_THRESHOLD else "hot"
    mem_id = str(uuid.uuid4())[:8]
    conn = sqlite3.connect(DB_PATH)
    c = conn.cursor()
    c.execute("""
        INSERT INTO memories (id, content, importance, scope, metadata, created_at, last_accessed, access_count, layer)
        VALUES (?, ?, ?, ?, ?, ?, ?, 0, ?)
    """, (mem_id, text, importance, scope, json.dumps(metadata or {}), now, now, layer))
    conn.commit()
    conn.close()
    return mem_id

def recall(query: str, limit: int = 5, scope: str = None, use_embedding: bool = True) -> list:
    run_decay()
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    c = conn.cursor()
    sql = "SELECT * FROM memories WHERE importance > ?"
    params = [DECAY_THRESHOLD]
    if scope:
        sql += " AND scope = ?"
        params.append(scope)
    rows = c.execute(sql, params).fetchall()
    conn.close()

    q_vec = None
    if use_embedding:
        q_vec = _get_embedding(query)

    scored = []
    for row in rows:
        m_vec = _get_embedding(row["content"]) if q_vec else None
        v_score = _cosine(q_vec, m_vec) if (q_vec and m_vec) else 0.5
        s = _composite_score(row["importance"], row["last_accessed"], row["access_count"], v_score)
        scored.append({
            "id": row["id"],
            "content": row["content"],
            "score": round(s, 4),
            "importance": row["importance"],
            "layer": row["layer"],
            "last_accessed": row["last_accessed"],
            "metadata": json.loads(row["metadata"] or "{}")
        })

    scored.sort(key=lambda x: x["score"], reverse=True)
    return scored[:limit]

def forget(scope: str = None, below_importance: float = None):
    conn = sqlite3.connect(DB_PATH)
    c = conn.cursor()
    if scope:
        c.execute("DELETE FROM memories WHERE scope = ?", (scope,))
    elif below_importance is not None:
        c.execute("DELETE FROM memories WHERE importance < ?", (below_importance,))
    conn.commit()
    conn.close()

def run_decay():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    c = conn.cursor()
    c.execute("SELECT id, importance, last_accessed, access_count FROM memories WHERE layer = 'hot'")
    for row in c.fetchall():
        new_imp = row["importance"] * DECAY_RATE
        new_ts = row["last_accessed"] + 3600
        if new_imp < DECAY_THRESHOLD:
            c.execute("DELETE FROM memories WHERE id = ?", (row["id"],))
        else:
            c.execute("""
                UPDATE memories SET importance = ?, last_accessed = ?, access_count = ?
                WHERE id = ?
            """, (new_imp, new_ts, row["access_count"] + 1, row["id"]))
    conn.commit()
    conn.close()

def access(mem_id: str):
    conn = sqlite3.connect(DB_PATH)
    c = conn.cursor()
    c.execute("UPDATE memories SET last_accessed = ?, access_count = access_count + 1 WHERE id = ?",
              (time.time(), mem_id))
    conn.commit()
    conn.close()

def extract(raw_text: str) -> list:
    """
    用LLM从原始文本抽取记忆列表
    调硅基流动（需 SILICONFLOW_API_KEY 环境变量）或降为本地规则
    """
    api_key = os.environ.get("SILICONFLOW_API_KEY", "")
    if not api_key:
        # 降级：返回规则匹配结果
        return [{"content": raw_text[:200], "importance": 0.5, "scope": "global"}]

    try:
        import urllib.request
        prompt = f"""从以下文本中抽取关键信息，每条格式为JSON：
[{{"content": "核心内容", "importance": 0.0-1.0, "scope": "global|project|preference|decision"}}]

规则：
- importance > 0.7 = 重要（长期保留，WARM层）
- importance 0.4-0.7 = 中等（HOT层，会缓慢衰减）
- importance < 0.4 = 不重要（快速遗忘）
- 偏好、决策、关键项目状态 → importance ≥ 0.7
- 闲聊、临时调试 → importance < 0.5

文本：
{raw_text}

只输出JSON数组，不要任何解释。"""

        data = json.dumps({
            "model": "Pro/deepseek-ai/DeepSeek-V3",
            "messages": [{"role": "user", "content": prompt}],
            "max_tokens": 1024,
            "temperature": 0.1
        }, ensure_ascii=False).encode()

        req = urllib.request.Request(
            "https://api.siliconflow.cn/v1/chat/completions",
            data=data,
            headers={
                "Authorization": f"Bearer {api_key}",
                "Content-Type": "application/json"
            }
        )
        with urllib.request.urlopen(req, timeout=30) as resp:
            result = json.loads(resp.read())
            text = result["choices"][0]["message"]["content"].strip()
            if text.startswith("```"):
                parts = text.split("```")
                for p in parts:
                    if p.strip().startswith("["):
                        text = p.strip()
                        break
            return json.loads(text)
    except Exception:
        return [{"content": raw_text[:200], "importance": 0.5, "scope": "global"}]

def stats() -> dict:
    conn = sqlite3.connect(DB_PATH)
    c = conn.cursor()
    total = c.execute("SELECT COUNT(*) FROM memories").fetchone()[0]
    hot = c.execute("SELECT COUNT(*) FROM memories WHERE layer='hot'").fetchone()[0]
    warm = c.execute("SELECT COUNT(*) FROM memories WHERE layer='warm'").fetchone()[0]
    avg_imp = c.execute("SELECT AVG(importance) FROM memories").fetchone()[0] or 0
    conn.close()
    return {"total": total, "hot": hot, "warm": warm, "avg_importance": round(avg_imp, 4)}

if __name__ == "__main__":
    import sys
    cmd = sys.argv[1] if len(sys.argv) > 1 else "stats"
    if cmd == "stats":
        print(json.dumps(stats(), ensure_ascii=False, indent=2))
    elif cmd == "recall":
        q = sys.argv[2] if len(sys.argv) > 2 else ""
        for m in recall(q, limit=5):
            print(f"[{m['score']}] {m['content']}")
    elif cmd == "remember":
        text = sys.argv[2]
        imp = float(sys.argv[3]) if len(sys.argv) > 3 else 0.5
        print(remember(text, imp))
    elif cmd == "extract":
        text = sys.argv[2]
        items = extract(text)
        for item in items:
            print(f"[{item['importance']}] {item['content']}")
    elif cmd == "decay":
        run_decay()
        print("done")
    elif cmd == "forget":
        scope = sys.argv[2] if len(sys.argv) > 2 else None
        forget(scope=scope)
        print("done")
