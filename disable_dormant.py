# -*- coding: utf-8 -*-
"""
批量给待归档skills添加 disable-model-invocation: true
正确格式: YAML frontmatter 里的 key: value
"""

import os
import re
from pathlib import Path

SKILLS_DIR = Path(os.path.expanduser("~/.openclaw/skills"))

ACTIVE_PREFIXES = ["local-ai", "self-improv", "memory", "computer-use", "skill-", "find-",
                  "browser", "git", "docker", "code", "kronos", "okx", "solana", "ccxt",
                  "crypto", "telegram", "api-dev", "session-logs", "network",
                  "clipboard", "openclaw", "windows-gui", "windows-ui", "powershell",
                  "freeride", "github", "gh-", "senior", "code-review", "code-review-expert",
                  "agent-browser", "agent-crew", "agentic", "apex", "base-trader", "binance",
                  "day-trading", "dex-crm", "etherlink", "ibkr", "kalshi", "maxxit",
                  "moltrade", "openbroker", "polymarket", "predictme", "quant-trading",
                  "simul8or", "soroban", "trading", "warren", "okx"]

CORE_SKILLS = {"local-ai-clients", "self-improving", "skill-creator", "find-skill", "find-skills",
               "memory-graph", "browser", "computer-use-windows", "git-essentials", "docker-essentials",
               "openclaw-v2-core", "openclaw-mem", "openclaw-tavily-search", "openclaw-auto-updater",
               "windows-gui-control", "windows-ui-automation", "computer-use", "browser-automation",
               "agentic-workflow-automation", "subagent-driven-development"}

def is_active(name):
    if name in CORE_SKILLS:
        return True
    for p in ACTIVE_PREFIXES:
        if name.startswith(p) or name == p:
            return True
    return False

disabled = []
skipped = []
errors = []

for skill_dir in SKILLS_DIR.iterdir():
    if not skill_dir.is_dir():
        continue
    name = skill_dir.name
    if is_active(name):
        skipped.append(name)
        continue

    md_file = skill_dir / "SKILL.md"
    if not md_file.exists():
        errors.append(f"{name}: no SKILL.md")
        continue

    content = md_file.read_text(encoding="utf-8", errors="ignore")

    # 检查是否已有 disable-model-invocation
    if re.search(r'^disable-model-invocation:\s*true', content, re.MULTILINE):
        skipped.append(f"{name}: already disabled")
        continue

    # 解析 frontmatter
    if content.startswith('---'):
        parts = content[3:].split('---', 1)
        if len(parts) == 2:
            frontmatter = parts[0]
            body = parts[1]
            # 检查frontmatter是否已有
            if 'disable-model-invocation:' in frontmatter:
                skipped.append(f"{name}: already in frontmatter")
                continue
            # 追加到frontmatter
            frontmatter = frontmatter.rstrip() + '\ndisable-model-invocation: true\n'
            new_content = '---\n' + frontmatter + '---\n' + body
        else:
            errors.append(f"{name}: frontmatter parse error")
            continue
    else:
        # 没有frontmatter，创建一个
        new_content = '---\ndisable-model-invocation: true\n---\n' + content

    md_file.write_text(new_content, encoding="utf-8")
    disabled.append(name)

print(f"已禁用: {len(disabled)} 个")
print(f"跳过(活跃或已有): {len(skipped)} 个")
if errors:
    print(f"错误: {len(errors)} 个")

print()
print("禁用的skills:")
for n in sorted(disabled):
    print(f"  - {n}")
