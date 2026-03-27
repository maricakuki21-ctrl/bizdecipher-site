# AGENTS.md - OpenClaw 五层架构配置
# Version: 2.0.0
# Last Updated: 2026-03-19

---

## 架构概览

```
┌─────────────────────────────────────────────────────────────┐
│  LAYER 0: 入口层 (Entry)                                     │
│  ├─ intent-classifier     意图识别                          │
│  └─ task-router           任务路由                          │
├─────────────────────────────────────────────────────────────┤
│  LAYER 1: 战略层 (CEO)                                       │
│  ├─ requirement-digger    需求挖掘                          │
│  ├─ strategy-decomposer   战略拆解                          │
│  ├─ decision-logger       决策记录                          │
│  ├─ risk-radar           风险雷达                           │
│  └─ post-mortem          复盘大师                           │
├─────────────────────────────────────────────────────────────┤
│  LAYER 2: 战术层 (CTO)                                       │
│  ├─ cto-orchestrator     CTO编排                            │
│  ├─ workflow-engine      工作流引擎                         │
│  ├─ agent-crew           Agent团队                          │
│  ├─ progress-monitor     进度监控                           │
│  └─ quality-gatekeeper   质量门禁                           │
├─────────────────────────────────────────────────────────────┤
│  LAYER 3: 执行层 (Worker)                                    │
│  ├─ 164个专业Agent (按领域分类)                             │
│  └─ 包括: 财务、交易、开发、营销、自动化等                   │
├─────────────────────────────────────────────────────────────┤
│  LAYER 4: 基础设施 (Infra)                                   │
│  ├─ tool-marketplace     工具市场                           │
│  ├─ observability        可观测性                           │
│  └─ security-guard       安全系统                           │
└─────────────────────────────────────────────────────────────┘
```

---

## Read When

- 首次配置OpenClaw
- 添加新Agent
- 修改路由规则
- 调试任务流程
- 优化架构性能

---

## 核心Agent配置

### L0: 入口层

#### intent-classifier
```yaml
name: intent-classifier
description: 识别用户输入的真实意图
when_to_use:
  - 用户输入模糊或不完整
  - 需要判断任务类型和复杂度
  - 需要决定路由到哪个Agent
input: 用户原始输入（自然语言）
output: 结构化意图（包含类型、复杂度、领域、紧急度）
routing:
  Simple: 直接到Worker
  Medium: 到CTO层
  Complex: 到CEO层
  Epic: 到CEO层（多阶段）
```

#### task-router
```yaml
name: task-router
description: 根据意图分类结果，将任务路由到正确的Agent
when_to_use:
  - 已识别用户意图，需要决定执行路径
  - 需要调度Agent资源
  - 需要处理Agent故障转移
input: 来自intent-classifier的输出
output: 路由决策（目标Agent、策略、优先级、预算）
strategies:
  - spawn: 生成子Agent
  - delegate: 直接委托
  - queue: 加入队列
```

---

### L1: 战略层 (CEO)

#### requirement-digger
```yaml
name: requirement-digger
description: 深度挖掘用户需求，从模糊想法到清晰目标
when_to_use:
  - 用户说"我想..."但没说清楚
  - 需求看起来简单但可能隐藏复杂性
  - 需要判断任务优先级和资源分配
  - Complex/Epic级别任务开始前
methods:
  - 5W2H基础挖掘
  - 反向提问
  - 利益相关者分析
  - 模式识别
output: 结构化需求报告
```

#### strategy-decomposer
```yaml
name: strategy-decomposer
description: 将战略目标拆解为可执行任务
when_to_use:
  - 有战略目标但不知道如何落地
  - Complex/Epic级别任务需要分阶段执行
  - 需要识别关键路径和瓶颈
methods:
  - 目标分层
  - 任务分类
  - 依赖分析
  - 资源分配
  - 风险对冲
output: 战略包（包含任务清单、路线图、风险评估）
```

#### decision-logger
```yaml
name: decision-logger
description: 记录关键决策，建立决策日志
when_to_use:
  - 做出重要决策时
  - 需要解释为什么选A不选B
  - 复盘时回顾决策过程
decision_types:
  - Irreversible: 不可逆决策
  - Reversible: 可逆决策
  - Default: 默认决策
output: 决策记录（包含决策树、选择理由、预期结果）
```

#### risk-radar
```yaml
name: risk-radar
description: 持续扫描风险，识别潜在问题
when_to_use:
  - 项目启动前风险评估
  - 执行过程中风险监控
  - 重大决策前风险扫描
risk_categories:
  - Technical: 技术风险
  - Business: 商业风险
  - Operational: 运营风险
  - Compliance: 合规风险
output: 风险报告（包含风险清单、监控计划、应急预案）
```

#### post-mortem
```yaml
name: post-mortem
description: 系统性地总结经验教训
when_to_use:
  - 项目结束后
  - 重大决策后
  - 故障/失败后
  - 定期回顾
types:
  - Project Review: 项目复盘
  - Decision Review: 决策复盘
  - Incident Review: 故障复盘
  - Milestone Review: 里程碑复盘
output: 复盘报告（包含经验萃取、行动计划、知识沉淀）
```

---

### L2: 战术层 (CTO)

#### cto-orchestrator
```yaml
name: cto-orchestrator
description: CTO层编排者，接收CEO的战略包，拆解为可执行任务
when_to_use:
  - 接收战略包需要执行
  - 需要调度Agent集群
  - 需要监控进度
workflow: PDCV
  - Plan: 规划
  - Decompose: 分解
  - Confirm: 确认（可选）
  - Execute: 执行
  - Verify: 验证
  - Report: 汇报
output: 执行报告
```

#### workflow-engine
```yaml
name: workflow-engine
description: 可视化编排复杂工作流
when_to_use:
  - 需要编排多步骤任务
  - 需要条件分支和循环
  - 需要并行执行
  - 需要错误处理和重试
node_types:
  - trigger: 触发器
  - action: 动作
  - condition: 条件
  - loop: 循环
  - parallel: 并行
output: 工作流执行报告
```

#### agent-crew
```yaml
name: agent-crew
description: 多Agent协作框架
when_to_use:
  - 复杂任务需要多角色协作
  - 需要并行处理多个子任务
  - 需要角色互补
process_types:
  - Sequential: 顺序协作
  - Parallel: 并行协作
  - Hierarchical: 层级协作
  - Iterative: 迭代协作
output: 团队协作报告
```

#### progress-monitor
```yaml
name: progress-monitor
description: 实时监控任务进度
when_to_use:
  - 需要跟踪多任务进度
  - 需要识别阻塞和瓶颈
  - 需要预警延期风险
visualizations:
  - Kanban: 看板
  - Gantt: 甘特图
  - Burndown: 燃尽图
output: 进度报告
```

#### quality-gatekeeper
```yaml
name: quality-gatekeeper
description: 质量把控，建立质量门禁
when_to_use:
  - 交付前质量检查
  - 代码合并前审查
  - 里程碑验收
quality_gates:
  - Code Quality: 代码质量
  - Documentation: 文档质量
  - Test Quality: 测试质量
  - Business Quality: 商业质量
output: 质量报告
```

---

### L3: 执行层 (Worker) - 核心技能

#### money-maker
```yaml
name: money-maker
description: 商业变现专家
domain: 商业变现
monetization_models:
  - Product: 产品化
  - Service: 服务化
  - Content: 内容化
  - Automation: 自动化
output: 商业变现方案
```

#### growth-hacker
```yaml
name: growth-hacker
description: 增长黑客
domain: 用户增长
framework: AARRR
  - Acquisition: 获客
  - Activation: 激活
  - Retention: 留存
  - Revenue: 变现
  - Referral: 推荐
output: 增长方案
```

#### browser-automation
```yaml
name: browser-automation
description: 浏览器自动化
domain: 网页操作
capabilities:
  - Navigation: 网页导航
  - Interaction: 元素操作
  - Extraction: 数据提取
  - Screenshots: 截图PDF
  - Session: 会话管理
output: 自动化执行报告
```

#### code-review-expert
```yaml
name: code-review-expert
description: 代码审查专家
domain: 代码质量
dimensions:
  - Correctness: 正确性
  - Performance: 性能
  - Security: 安全性
  - Readability: 可读性
  - Maintainability: 可维护性
  - Architecture: 架构
output: 代码审查报告
```

#### memory-graph
```yaml
name: memory-graph
description: 知识图谱记忆
domain: 记忆管理
memory_types:
  - Semantic: 语义记忆
  - Episodic: 情景记忆
  - Procedural: 程序记忆
output: 知识图谱查询结果
```

---

## 路由规则

### 复杂度路由矩阵

| 复杂度 | 路径 | 确认 | 审查 | 汇报 |
|--------|------|------|------|------|
| Simple | L0 → L3 | 否 | 否 | 否 |
| Medium | L0 → L2 → L3 | 可选 | 是 | 否 |
| Complex | L0 → L1 → L2 → L3 | 是 | 是 | 是 |
| Epic | L0 → L1 → L2 → L3 (多阶段) | 每阶段 | 是 | 每阶段 |

### 领域路由

| 用户意图 | 推荐Agent | 备选Agent |
|----------|-----------|-----------|
| 赚钱/变现 | money-maker | business, marketing |
| 开发代码 | coding-agent | code-review, github |
| 市场研究 | researcher | arxiv-watcher, blogwatcher |
| 自动化 | browser-automation | playwright-mcp |
| 数据分析 | excel-xlsx | summarize, financial-overview |
| 内容创作 | writer | content-marketing |
| 交易投资 | trading | binance-spot-trader |
| 财务管理 | accountant | ai-cfo, bookkeeper |

---

## 执行模式

### Mode 1: 简单模式 (Simple)
```
用户请求 → intent-classifier → task-router → Worker → 交付
时间: < 30分钟
成本: 低
质量: 自验证
```

### Mode 2: 标准模式 (Medium)
```
用户请求 → intent-classifier → task-router → cto-orchestrator → Worker → quality-gatekeeper → 交付
时间: 30分钟 - 2小时
成本: 中
质量: 交叉验证
```

### Mode 3: 复杂模式 (Complex)
```
用户请求 → intent-classifier → task-router → requirement-digger → strategy-decomposer → risk-radar → cto-orchestrator → workflow-engine → agent-crew → quality-gatekeeper → 交付
时间: 2-8小时
成本: 高
质量: 严格审查
```

### Mode 4: 史诗模式 (Epic)
```
用户请求 → intent-classifier → task-router → requirement-digger → strategy-decomposer → risk-radar → 
  Phase 1 → cto-orchestrator → workflow-engine → agent-crew → quality-gatekeeper → progress-monitor → 汇报 → 确认 →
  Phase 2 → ... → 交付
时间: 跨多天
成本: 很高
质量: 每个阶段严格审查
```

---

## 配置参数

### 资源限制
```yaml
max_budget_per_task: $10
max_time_per_task: 8小时
max_agents_per_task: 10
max_retries: 3
```

### 质量阈值
```yaml
code_coverage_threshold: 80%
quality_score_threshold: 0.8
review_required_for: [Complex, Epic]
```

### 监控设置
```yaml
progress_report_interval: 30分钟
risk_check_interval: 1小时
metrics_collection: true
```

---

## 故障处理

### Agent不可用
```
1. 尝试备用Agent
2. 加入队列等待
3. 上报CTO
4. 提供降级方案
```

### 任务失败
```
1. 记录失败原因
2. 自动重试(最多2次)
3. 如果仍失败，上报CTO
4. 提供备选方案
```

### 预算超支
```
1. 评估剩余任务
2. 如果超支<20%，继续并记录
3. 如果超支>20%，暂停并上报CEO
4. 提供成本优化建议
```

---

## 扩展指南

### 添加新Agent
1. 在对应层级创建Agent配置
2. 更新SKILL-REGISTRY.json
3. 更新路由规则
4. 测试验证

### 修改路由规则
1. 更新AGENTS.md中的routing_rules
2. 更新intent-classifier的映射
3. 测试不同场景
4. 记录变更日志

### 升级架构
1. 参考大厂最佳实践
2. 设计新架构方案
3. 渐进式迁移
4. 全面测试

---

## 附录

### 技能清单
完整技能清单见: SKILL-REGISTRY.json

### 版本历史
- v2.0.0 (2026-03-19): 五层架构全面升级
- v1.0.0: 初始版本

### 参考文档
- docs/architecture.md
- docs/routing.md
- docs/skills.md
