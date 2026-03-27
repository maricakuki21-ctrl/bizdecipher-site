# -*- coding: utf-8 -*-
"""
全面体检报告 - 2026-03-27
维度: 记忆/技能/项目/配置/安全/性能
"""

import os
import re
import sqlite3
import json
from pathlib import Path
from datetime import datetime, timedelta

ROOT = Path(os.path.dirname(__file__))
SKILLS_DIR = Path(os.path.expanduser("~/.openclaw/skills"))
WORKSPACE = ROOT / "workspace"
MEMORY_DB = ROOT / "memory" / "memory.db"
MEMORY_FILE = ROOT / "MEMORY.md"
HEARTBEAT = ROOT / "HEARTBEAT.md"
SOUL = ROOT / "SOUL.md"
OPENCLAW_JSON = Path(os.path.expanduser("~/.openclaw/openclaw.json"))

report = []
now = datetime.now()

def section(title):
    report.append(f"\n{'='*50}")
    report.append(f"  {title}")
    report.append('='*50)

def check(name, ok, detail=""):
    icon = "✅" if ok else "❌"
    report.append(f"{icon} {name}")
    if detail:
        report.append(f"   {detail}")

# === 1. 记忆系统 ===
section("1. 记忆系统")
try:
    conn = sqlite3.connect(str(MEMORY_DB))
    c = conn.cursor()
    total = c.execute("SELECT COUNT(*) FROM memories").fetchone()[0]
    hot = c.execute("SELECT COUNT(*) FROM memories WHERE layer='hot'").fetchone()[0]
    warm = c.execute("SELECT COUNT(*) FROM memories WHERE layer='warm'").fetchone()[0]
    avg_imp = c.execute("SELECT AVG(importance) FROM memories").fetchone()[0] or 0
    old = c.execute("SELECT COUNT(*) FROM memories WHERE importance < 0.15").fetchone()[0]
    conn.close()
    check("memory_store.py", True, f"DB存在 | 总{total}条 WARM{warm} HOT{hot} | avg_imp={avg_imp:.3f} | 即将删除{old}条")
except Exception as e:
    check("memory_store.py", False, str(e))

try:
    content = MEMORY_FILE.read_text(encoding="utf-8", errors="ignore")
    lines = len(content.splitlines())
    size_kb = len(content) / 1024
    check("MEMORY.md", size_kb < 100, f"{lines}行 | {size_kb:.1f}KB {'⚠️过大' if size_kb > 100 else '正常'}")
except Exception as e:
    check("MEMORY.md", False, str(e))

# === 2. 技能系统 ===
section("2. 技能系统")
total_skills = len(list(SKILLS_DIR.iterdir()))
enabled = []
disabled = []
for sd in SKILLS_DIR.iterdir():
    if not sd.is_dir():
        continue
    md = sd / "SKILL.md"
    if md.exists():
        c = md.read_text(encoding="utf-8", errors="ignore")
        if "disable-model-invocation: true" in c:
            disabled.append(sd.name)
        else:
            enabled.append(sd.name)
check("技能总量", total_skills > 0, f"{total_skills}个")
check("已启用", len(enabled) <= 70, f"{len(enabled)}个 {'⚠️过多' if len(enabled) > 70 else '正常'}")
check("已禁用", len(disabled) >= 100, f"{len(disabled)}个 (休眠技能)")
check("Disable机制", len(disabled) >= 100, f"164个已禁用，不进model prompt")

# === 3. 项目文件健康 ===
section("3. 项目文件")
files_py = list(ROOT.glob("*.py"))
files_js = list(ROOT.glob("*.js")) + list(ROOT.glob("*.mjs"))
files_ps1 = list(ROOT.glob("*.ps1"))
files_untracked = [f for f in files_py + files_js + files_ps1 if f.name not in ['memebox_bot.py', 'weixin_rpc.py', 'weixin_login.py', 'weixin-rpc.js', 'weixin-rpc.mjs', 'weixin-rpc.ps1']]
check("根目录py/js文件", len(files_untracked) < 10, f"{len(files_untracked)}个临时脚本 {'⚠️需清理' if len(files_untracked) > 10 else '正常'}")

# workspace总量
try:
    all_files = list(WORKSPACE.rglob("*")) if WORKSPACE.exists() else []
    dirs = [f for f in all_files if f.is_dir()]
    files_w = [f for f in all_files if f.is_file()]
    total_size = sum(f.stat().st_size for f in files_w if f.is_file()) / 1024 / 1024
    check("workspace总量", True, f"{len(files_w)}文件 / {len(dirs)}目录 | {total_size:.1f}MB")
    data_dir = WORKSPACE / "data"
    if data_dir.exists():
        data_files = list(data_dir.rglob("*"))
        data_size = sum(f.stat().st_size for f in data_files if f.is_file()) / 1024 / 1024
        check("data目录", data_size < 100, f"{data_size:.1f}MB {'⚠️过大' if data_size > 100 else '正常'}")
except Exception as e:
    check("workspace", False, str(e))

# === 4. 核心配置文件 ===
section("4. 核心配置")
files_to_check = {
    "HEARTBEAT.md": HEARTBEAT,
    "SOUL.md": SOUL,
    "MEMORY.md": MEMORY_FILE,
    "openclaw.json": OPENCLAW_JSON,
}
for name, path in files_to_check.items():
    ok = path.exists()
    age_days = (now - datetime.fromtimestamp(path.stat().st_mtime)).days if ok else -1
    check(f"{name}", ok, f"{'存在' if ok else '不存在'} | {age_days}天前修改" if ok else "不存在")

# === 5. Bot/项目状态 ===
section("5. MemeBox Bot 状态")
bot_file = ROOT / "memebox_bot.py"
bot_db = ROOT / "memebox.db"
if bot_file.exists() and bot_db.exists():
    db_size = bot_db.stat().st_size / 1024
    age_days = (now - datetime.fromtimestamp(bot_db.stat().st_mtime)).days
    check("Bot代码", True, f"存在 | {db_size:.1f}KB | {age_days}天前更新")
    # 表数量
    try:
        conn = sqlite3.connect(str(bot_db))
        tables = conn.execute("SELECT COUNT(*) FROM sqlite_master WHERE type='table'").fetchone()[0]
        conn.close()
        check("Bot数据库", True, f"{tables}张表 | {db_size:.1f}KB")
    except Exception as e:
        check("Bot数据库", False, str(e))
else:
    check("Bot文件", False, "bot或db不存在")

# HEARTBEAT里Bot状态
if HEARTBEAT.exists():
    hb = HEARTBEAT.read_text(encoding="utf-8", errors="ignore")
    if "PID" in hb or "polling" in hb.lower():
        check("HEARTBEAT Bot记录", True, "Bot运行状态已记录")
    else:
        check("HEARTBEAT Bot记录", False, "Bot运行状态未记录")

# === 6. 安全检查 ===
section("6. 安全")
# API Key暴露检查
key_pattern = re.compile(r'sk-[a-zA-Z0-9]{20,}|api[_-]?key["\']?\s*[:=]\s*["\']?[a-zA-Z0-9]{20,}', re.I)
risky_files = []
for ext in ["*.py", "*.js", "*.mjs", "*.json"]:
    for f in ROOT.glob(ext):
        if f.name in ["openclaw.json", "memebox_config.json"]:
            continue
        try:
            c = f.read_text(encoding="utf-8", errors="ignore")
            if key_pattern.search(c):
                risky_files.append(f.name)
        except:
            pass
check("API Key泄露", len(risky_files) == 0, f"{len(risky_files)}个文件疑似暴露Key: {', '.join(risky_files[:3])}" if risky_files else "未发现")

# === 7. Git状态 ===
section("7. Git")
git_dir = ROOT / ".git"
check(".git存在", git_dir.exists(), "是" if git_dir.exists() else "否")
uncommitted = os.popen("git status --porcelain 2>nul").read().count("\n")
check("未提交变更", True, f"{uncommitted}个文件待提交")

# === 8. 性能基线 ===
section("8. 性能基线")
# MEMORY.md行数
mem_lines = len(MEMORY_FILE.read_text(encoding="utf-8", errors="ignore").splitlines()) if MEMORY_FILE.exists() else 0
check("MEMORY.md大小", mem_lines < 2000, f"{mem_lines}行 {'⚠️建议压缩' if mem_lines > 2000 else '正常'}")

# memory.db大小
if MEMORY_DB.exists():
    db_size_kb = MEMORY_DB.stat().st_size / 1024
    check("memory.db大小", db_size_kb < 10, f"{db_size_kb:.1f}KB")
else:
    check("memory.db", False, "不存在")

# === 汇总 ===
section("汇总")
report.append(f"\n体检时间: {now.strftime('%Y-%m-%d %H:%M')}")
report.append(f"技能: {len(enabled)}启用 / {len(disabled)}禁用")
report.append(f"记忆: WARM{warm} + HOT{hot} = {total}条")
report.append(f"workspace: {len(files_w)}文件")

print("\n".join(report))
