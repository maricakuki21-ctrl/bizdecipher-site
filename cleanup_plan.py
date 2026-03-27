# -*- coding: utf-8 -*-
"""整理临时文件，按项目分"""
import os
from pathlib import Path

ROOT = Path(r"C:\Users\闲云野鹤\.openclaw\workspace-commander")
WSPACE = ROOT / "workspace"

groups = {
    "GTN策略研究": [],
    "OKX/MemeBox": [],
    "AI Bridge": [],
    "Freeride": [],
    "Trading通用": [],
    "Window自动化": [],
    "其他": [],
}

keywords = {
    "GTN策略研究": ["gtn", "gt", "energy", "breakout", "directional", "wave", "four_seasons", "internal_force", "ofi", "ofi_signal", "vol_dir", "waveform", "symmetric", "chan_lun", "fractal", "pivot", "segment", "stroke", "signal", "divergence"],
    "OKX/MemeBox": ["okx", "meme", "memebox", "telegram", "weixin", "bot"],
    "AI Bridge": ["ai_cfo", "cfo_", "cfo_cli", "ledger", "budget", "finance", "odoo", "enterprise"],
    "Freeride": ["freeride", "codex", "openrouter", "model-usage"],
    "Trading通用": ["trading", "trader", "strategy", "backtest", "backtester", "bt_", "fetch", "data_fetcher", "download", "kline", "order", "position"],
    "Window自动化": ["uia_", "gui_", "click", "type_text", "screenshot", "window", "ocr", "recorder", "replay", "port_owner", "install"],
}

for f in ROOT.glob("*.py"):
    if f.name in ['memebox_bot.py', 'memory_store.py', 'health_check.py', 'skill_scanner.py', 'disable_dormant.py', 'verify_disable.py', '__init__.py']:
        continue
    matched = False
    for grp, kws in keywords.items():
        for kw in kws:
            if kw in f.name:
                groups[grp].append(f.name)
                matched = True
                break
        if matched:
            break
    if not matched:
        groups["其他"].append(f.name)

for f in ROOT.glob("*.js") + list(ROOT.glob("*.mjs")):
    matched = False
    for grp, kws in keywords.items():
        for kw in kws:
            if kw in f.name:
                groups[grp].append(f.name)
                matched = True
                break
        if matched:
            break
    if not matched:
        groups["其他"].append(f.name)

for grp, files in groups.items():
    if files:
        print(f"\n=== {grp} ({len(files)}个) ===")
        for n in sorted(files):
            print(f"  {n}")
