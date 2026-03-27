# -*- coding: utf-8 -*-
"""
扫描所有skills，生成分类索引 v2
- 每个skill只归类一次
- 去重
- 待归档单独拎出来
"""

import os
import re
from pathlib import Path

SKILLS_DIR = Path(os.path.expanduser("~/.openclaw/skills"))
OUTPUT = Path(os.path.dirname(__file__)) / "SKILL-INDEX.md"

CATEGORIES = {
    "🪙 加密/交易": ["crypto", "trading", "binance", "okx", "dex", "solana", "bitcoin", "blockchain", "etherlink", "kronos", "ftx", "coinbase", "whale", "trader", "exchange", "polymarket", "predictme", "simul8or", "soroban"],
    "💼 商业/B2B": ["business", "crm", "sales", "salesforce", "hubspot", "marketing", "lead", "client", "customer", "revenue", "growth", "analytics", "bi", "intelligence", "partnership", "outreach"],
    "🛠️ 开发/代码": ["code", "git", "github", "docker", "api", "devops", "deploy", "cicd", "pipeline", "debug", "review", "coding", "python", "javascript", "typescript", "sql", "programming"],
    "📊 财务/量化": ["finance", "accounting", "bookkeep", "quant", "invest", "portfolio", "balance", "tax", "audit", "financial", "budget", "risk", "expense", "ledger", "trading"],
    "🤖 自动化/Agent": ["agent", "automation", "workflow", "trigger", "cron", "schedule", "orchestrat", "crew", "subagent", "actor", "executor", "proactive"],
    "🌐 平台/集成": ["feishu", "lark", "telegram", "discord", "slack", "notion", "obsidian", "jira", "confluence", "google", "office", "wechat", "line", "email", "imap", "smtp", "whatsapp"],
    "🧠 记忆/知识": ["memory", "knowledge", "graph", "rag", "embed", "context", "learn", "recall", "note", "wiki", "doc", "semantic"],
    "🖥️ 系统/桌面": ["windows", "mac", "linux", "system", "monitor", "network", "clipboard", "desktop", "gui", "control", "tmux"],
    "📄 文档/办公": ["pdf", "docx", "xlsx", "excel", "word", "pptx", "powerpoint", "markdown", "doc", "spreadsheet", "office"],
    "🎨 图像/媒体": ["image", "video", "audio", "tts", "stt", "voice", "generat", "draw", "design", "photo", "gif", "stream", "spectrogram", "spotify"],
    "🔍 搜索/爬虫": ["search", "scrap", "crawl", "browser", "fetch", "extract", "index", "spider", "crawl"],
    "🔐 安全/验证": ["security", "auth", "password", "encrypt", "vault", "1password", "key"],
}

CORE_SKILLS = {
    "local-ai-clients", "self-improving", "skill-creator", "find-skill", "find-skills",
    "memory-graph", "browser", "computer-use-windows", "git-essentials", "docker-essentials",
    "openclaw-v2-core", "openclaw-mem", "openclaw-tavily-search"
}

ACTIVE_PREFIXES = ["local-ai", "self-improv", "memory", "computer-use", "skill-", "find-",
                  "browser", "git", "docker", "code", "kronos", "okx", "solana", "ccxt",
                  "crypto", "telegram", "api-dev", "telegram", "session-logs", "network",
                  "clipboard", "openclaw", "windows-gui", "windows-ui", "powersehll"]

def is_active(skill_name):
    for p in ACTIVE_PREFIXES:
        if skill_name.startswith(p) or skill_name == p:
            return True
    return skill_name in CORE_SKILLS

# 收集所有skill
all_skills = {}
for skill_dir in SKILLS_DIR.iterdir():
    if not skill_dir.is_dir():
        continue
    name = skill_dir.name
    md = skill_dir / "SKILL.md"
    if not md.exists():
        continue
    
    text = md.read_text(encoding="utf-8", errors="ignore")
    name_m = re.search(r'^name:\s*(.+)$', text, re.MULTILINE)
    desc_m = re.search(r'^description:\s*"?([^"\n]+)"?', text, re.MULTILINE)
    display = name_m.group(1).strip() if name_m else name
    desc = desc_m.group(1).strip() if desc_m else ""
    
    # 归类（只归第一个匹配）
    content_lower = (display + " " + desc + " " + name).lower()
    assigned = False
    for cat, keywords in CATEGORIES.items():
        for kw in keywords:
            if kw in content_lower:
                if cat not in all_skills:
                    all_skills[cat] = {}
                all_skills[cat][name] = {"display": display, "desc": desc[:70], "name": name}
                assigned = True
                break
        if assigned:
            break
    
    if not assigned:
        if "📦 其他" not in all_skills:
            all_skills["📦 其他"] = {}
        all_skills["📦 其他"][name] = {"display": display, "desc": desc[:70], "name": name}

# 统计
total = sum(len(v) for v in all_skills.values())
active_count = sum(1 for cat in all_skills for n in all_skills[cat] if is_active(n))
dormant_all = {n: v for cat in all_skills for n, v in all_skills[cat].items() if not is_active(n) and n not in CORE_SKILLS}

# 生成
lines = [
    "# SKILL-INDEX — 技能分类索引",
    "",
    f"> 自动扫描 {__import__('datetime').datetime.now().strftime('%Y-%m-%d %H:%M')} | 共 {total} 个skills | 活跃/核心 {active_count} | 待归档 {len(dormant_all)}",
    "",
    "---",
    "",
    "## 核心必留 (~13个) — Always Active",
    ""
]
for n in sorted(CORE_SKILLS):
    if n in all_skills.get("🧠 记忆/知识", {}) or any(n in v for v in all_skills.values()):
        for cat, skills in all_skills.items():
            if n in skills:
                lines.append(f'  `{n}` — {skills[n]["desc"]}')
                break
    else:
        lines.append(f'  `{n}`')

lines.extend(["", "---", ""])

for cat in sorted(all_skills.keys()):
    if cat == "📦 其他":
        continue
    skills = all_skills[cat]
    active = [n for n in skills if is_active(n)]
    lines.append(f"## {cat} — {len(active)}/{len(skills)} 活跃")
    lines.append("")
    for n in sorted(skills.keys(), key=lambda x: (not is_active(x), x)):
        mark = "🟢" if is_active(n) else "⚪"
        lines.append(f'{mark} `{n}` — {skills[n]["desc"]}')
    lines.append("")

lines.extend(["", "---", ""])
lines.append(f"## 📦 其他 ({len(all_skills.get('📦 其他', {}))}个)")
lines.append("")
other = all_skills.get("📦 其他", {})
for n in sorted(other.keys(), key=lambda x: (not is_active(x), x)):
    mark = "🟢" if is_active(n) else "⚪"
    lines.append(f'{mark} `{n}` — {other[n]["desc"]}')

lines.extend(["", "---", ""])
lines.append(f"## 🗃️ 待归档 — {len(dormant_all)}个")
lines.append("")
lines.append("*⚪ = 最近未使用，建议 disable 或删除*")
lines.append("")
for n in sorted(dormant_all.keys()):
    v = dormant_all[n]
    lines.append(f'- `{n}` — {v["desc"]}')

OUTPUT.write_text("\n".join(lines), encoding="utf-8")
print(f"OK: {OUTPUT}")
print(f"总skills: {total}, 活跃: {active_count}, 待归档: {len(dormant_all)}")
