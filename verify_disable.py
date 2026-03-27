# -*- coding: utf-8 -*-
"""验证禁用效果"""
import os, re
from pathlib import Path

SKILLS_DIR = Path(os.path.expanduser("~/.openclaw/skills"))

enabled = []
disabled = []
no_frontmatter = []

for skill_dir in SKILLS_DIR.iterdir():
    if not skill_dir.is_dir():
        continue
    name = skill_dir.name
    md_file = skill_dir / "SKILL.md"
    if not md_file.exists():
        continue
    content = md_file.read_text(encoding="utf-8", errors="ignore")
    if re.search(r'^disable-model-invocation:\s*true', content, re.MULTILINE):
        disabled.append(name)
    else:
        enabled.append(name)

print(f"✅ 已启用(model能看到): {len(enabled)} 个")
print(f"🚫 已禁用(model看不到): {len(disabled)} 个")
print()
print("验证几个关键skill:")
for check in ["local-ai-clients", "memory-graph", "telegram", "okx-dex", "bitcoin"]:
    md = SKILLS_DIR / check / "SKILL.md"
    if md.exists():
        c = md.read_text(encoding="utf-8", errors="ignore")
        st = "🚫" if "disable-model-invocation: true" in c else "✅"
        print(f"  {st} {check}")
