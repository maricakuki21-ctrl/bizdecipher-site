# HEARTBEAT.md

## 状态：✅ 活跃中

MemeBox Telegram Bot 项目开发中 + **记忆系统升级（2026-03-27）**

### 🆕 稀疏记忆系统
- **文件**: `workspace-commander/memory_store.py`
- **架构**: FadeMem-inspired，双层（HOT快速衰减 / WARM慢衰减）
- **核心API**: remember() / recall() / extract() / forget() / run_decay() / stats()
- **调用协议**: SOUL.md §7 已写入强制调用规则
- **状态**: ✅ 运行中（7条记忆，avg_importance=0.77）
- **安全**: API Key已改为环境变量 SILICONFLOW_API_KEY

### 🆕 技能系统重构（2026-03-27）
- **活跃层**: ~68个（始终可见）
- **休眠层**: 164个（disable-model-invocation: true）
- **归档层**: workspace/ 66MB历史项目（保留不动）
- **维护工具**: skill_scanner.py / disable_dormant.py / verify_disable.py / health_check.py
- **索引**: SKILL-INDEX.md（技能分类总览）
- **规则**: API Key不硬编码，陌生skill先scan再启用

### 全面体检结果（2026-03-27）
- ✅ 记忆系统正常
- ✅ 技能启用68/禁用164
- ✅ Bot代码+DB正常
- ✅ 安全无Key泄露
- ✅ workspace 66MB全保留（K线数据+项目文件）
- ❌ 根目录56个临时脚本待清理

### 项目概览
- **项目**：MemeBox - Telegram Meme Coin 盲盒平台
- **开始日期**：2026-03-24
- **当前阶段**：Bot MVP 开发中

### 核心文件
- Bot代码: `workspace-commander/memebox_bot.py`
- 配置文件: `workspace-commander/memebox_config.json`
- 设计文档: `workspace-commander/MEMEBOX_DESIGN.md`
- 模拟器: `Desktop/memebox_sim.py`
- Bot Token: `8294990664:AAGpW7tWR5lNSv7FfAImVM3-367s6uDYFUI`
- Bot名字: MoonBox（国际版）

### Bot 运行状态
- **进程**: 新进程 PID 15156（2026-03-27 06:55 UTC 重启）
- **状态**: polling 正常运行 ✅
- **Token**: 已配置 (8294990664:AAGpW7tWR5lNSv7FfAImVM3-367s6uDYFUI)
- **数据库**: memebox.db (SQLite)
- **Bot名称**: MoonBox（@shiwaishenxianbot 已更名为 MoonBox，2026-03-25）
| 功能 | 状态 |
|------|------|
| /start 命令 | ✅ |
| 开盒 🎁 | ✅ |
| 余额查询 💰 | ✅ |
| 邀请好友 👥 | ✅ |
| 战绩统计 📊 | ✅ |
| Jackpot 💎 | ✅ |
| 排行榜 🏆 | ✅ |
| 创始人面板 👑 | ✅ |
| 设置 ⚙️ | ✅ |

### 运营框架
- 框架文档: `MEMEBOX_FRAMEWORK.md`
- 经济模型（2026-03-26 确认版）:
  - $10/盒 = 平台$2 + Jackpot$1/盒积累 + 奖金池$7
  - Jackpot: 0.01%概率，起$500，无封顶
  - 五等: T5≤$1(79%) | T4$3(12%) | T3$10+100U(8.95%) | T2$500(0.03%) | T1$1000(0.01%)
  - 平台净利: $2/盒，返奖率32.5%
- Referral: 直推$0.50/次，间接$0.25/次
- Founder: $25/人（限50名），权益包括$8/盒开盒价+Jackpot 10%分成

### 待完成功能
- [ ] Bot 入 TG 群 + 战绩播报（**P0 阻塞**）
- [ ] 充值 (TRC20 地址生成 + 链上确认)
- [ ] 提现 (手动审核)
- [ ] Pity System
- [ ] 创始人称号系统 (Bot级别显示)
- [ ] 创始人专属群
- [ ] 战报模板设计
- [ ] Provably Fair 验证机制

### 监控规则
- Bot 进程每30分钟检查一次
- 模块完成立即更新状态
- 阻塞问题立即上报
- 最后活跃：2026-03-27 06:55 UTC（PID 15156 已重启，Bot API 正常）

### 遗留项目
- 算法捕手（暂停）：模块1+3+8已完成，模块2进行中，模块4-9待启动
