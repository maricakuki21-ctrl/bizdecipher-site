# 物理第一性原理交易策略
> 基于热力学 + 量子力学 + 耗散结构理论
> Version 1.0 | 2026-03-27

---

## 核心理念

**市场是一个耗散结构（Dissipative Structure），遵守物理定律。**

- 必须不断从外部输入能量（流动性）才能维持自身结构（趋势）
- 能量耗散完毕，结构崩塌（趋势结束/相变）
- 系统永远趋向最大熵（无序），有序只是暂时的

```
流动性（能量输入）→ 四季（相态）→ 量子跃迁（临界突破）→ 背离（能量衰竭预警）
```

---

## 第一层：流动性 = 热力学根

### 物理模型：Market Temperature（市场温度）

来自 BTC order book 数据的物理学研究（PMC 2024）：
- **Market Temperature** = f(订单簿动能 + 订单簿势能)
- 与流动性指标强相关：Active Quote Volume、买卖价差、成交量
- **温度升高** = 流动性充裕，多空博弈激烈
- **温度降低** = 流动性枯竭，市场冷却

### 计算公式（简化版）

```
T = (Σ Qty_bid * ΔPrice_bid + Σ Qty_ask * ΔPrice_ask) / Volume
```

无高端数据时，用代理指标：
- 高时间框架波动率（HV）作为 Market Temperature
- 成交量变化率作为热力学通量
- 买卖价差（Spread）作为局部温度

### 宏观根：全球流动性

信贷周期领先全球经济指标：
- 全球流动性扩张 → 风险资产整体beta向上
- 流动性紧缩 → 加密市场系统性下跌

**代理指标**（按优先级）：
1. DXY（美元指数）— 美元流动性反向指标
2. 高收益债利差 — 信用风险/流动性代理
3. 美联储资产负债表变化率 — 基础货币供应

---

## 第二层：四季 = 相态（Phase States）

### 物理模型：Ising Model（伊辛模型）

统计物理中的相变模型——个体微观磁矩的随机摆动 → 宏观磁性突变。

**对应市场：**
- 个体交易者随机买卖 → 市场价格微观波动
- 外部磁场（流动性）方向 → 决定市场整体趋势方向
- **临界温度（Curie Temperature）** → 四季切换点

### 四季定义

| 相态 | 市场状态 | 价格行为 | 物理类比 |
|------|---------|---------|---------|
| **春** | 上涨趋势启动 | 低点抬高，高点突破 | 磁场对齐完成，磁化方向确立 |
| **夏** | 上位盘整/趋势延续 | 高位震荡 | 热运动对抗磁化，体系处于动态平衡 |
| **秋** | 下跌趋势启动 | 高点降低，低点破位 | 磁化减弱，热运动占优 |
| **冬** | 下位盘整/等待 | 低位横盘 | 体系冷却，最小能量态附近振荡 |

### 四季判定指标（简化版）

```python
def get_season(prices: np.array, volume: np.array, window: int = 20) -> str:
    """
    基于价格结构 + 成交量变化的四季判定
    """
    trend = prices[-1] / prices[-window] - 1          # 趋势强度
    volatility = np.std(prices[-window:]) / np.mean(prices[-window:])  # 波动率
    vol_change = volume[-1] / np.mean(volume[-window:]) - 1  # 成交量变化
    
    # 四季判定逻辑
    if trend > 0.02 and vol_change > 0.1:
        return "春"  # 趋势启动 + 放量
    elif trend > 0 and volatility < np.mean([...]):  # 历史均值
        return "夏"  # 趋势延续但波动收敛
    elif trend < -0.02 and vol_change > 0.1:
        return "秋"  # 趋势下跌 + 放量
    elif volatility < threshold:
        return "冬"  # 低波动等待
    else:
        return "过渡"
```

---

## 第三层：量子跃迁 = 临界突破（Phase Transition）

### 物理模型：量子相变（Quantum Phase Transition）

系统在**临界点**附近的行为：
- 临界涨落（Critical Fluctuations）：系统参数在临界点附近时，涨落剧烈
- 幂律分布（Power Law）：临界区域的各种量按幂律标度
- **序参量突变**：越过临界点后，系统性质突然改变

### 对应市场信号

| 物理现象 | 市场信号 |
|---------|---------|
| 临界涨落 | 短时间内大幅波动（日内3%+），随后平静 |
| 幂律标度 | 波动率聚集效应：大波动后跟随大波动 |
| 序参量突变 | 趋势方向突然改变（V形反转/尖顶） |
| 能级跃迁 | 盘整后突破（蓄力→爆发） |

### 量子跃迁信号识别

```python
def quantum_leap_signal(price: np.array, volume: np.array, window: int = 20) -> dict:
    """
    识别量子跃迁信号（临界突破）
    
    信号条件：
    1. 盘整期（低波动）+ 突然波动率爆发
    2. 成交量先缩后放（吸筹→突破）
    3. 价格突破关键位（支撑/压力）
    """
    # 计算短期 vs 长期波动率
    short_vol = np.std(price[-5:]) / np.mean(price[-5:])
    long_vol = np.std(price[-window:]) / np.mean(price[-window:])
    vol_ratio = short_vol / long_vol
    
    # 成交量变化
    vol_trend = np.mean(volume[-5:]) / np.mean(volume[-window:])
    
    # 判定
    if vol_ratio > 2.0 and vol_trend > 1.5:
        return {"signal": "量子跃迁", "strength": vol_ratio * vol_trend}
    return {"signal": "无", "strength": 0}
```

---

## 第四层：背离 = 能量衰竭预警

### 物理模型：能量守恒 + 熵增

- 价格创新高，但动量（能量）没有跟上 → 能量不守恒 → 必然回调
- 背离 = 系统能量衰竭的可观测信号

### 背离类型

| 类型 | 条件 | 信号强度 |
|------|------|---------|
| **强背离** | 价格创新高，RSI创低（>5%差） | 🔴 强反转信号 |
| **弱背离** | 价格创新高，RSI走平 | 🟡 警告 |
| **隐含背离** | 价格回撤但RSI未创新低 | 🟢 趋势延续确认 |

---

## 完整策略框架

```
输入层：流动性因子（Market Temperature / 宏观信贷）
   ↓
相态层：四季判定（春/夏/秋/冬）
   ↓
信号层：
  ├─ 量子跃迁（临界突破）→ 入场触发
  └─ 背离（能量衰竭）→ 反转预警 / 止盈
   ↓
决策层：根据相态决定策略
```

### 相态 → 策略映射

| 相态 | 方向 | 量子跃迁策略 | 背离策略 |
|------|------|------------|---------|
| **春** | 做多 | 回调入场，突破追 | 价格+成交量确认顶部 |
| **夏** | 做多/持有 | 趋势延续，逢低加 | 背离出现减仓/止盈 |
| **秋** | 做空 | 反弹入场，突破追 | 空头背离确认底部 |
| **冬** | 等待 | 不入场 | 无意义，不操作 |

---

## 入场逻辑示例（伪代码）

```python
def generate_signal(df: pd.DataFrame) -> dict:
    """
    完整信号生成
    df需包含: close, volume, high, low
    """
    # Step 1: 宏观流动性（简化版，用波动率代理）
    macro_score = calculate_market_temperature(df)
    
    # Step 2: 四季判定
    season = get_season(df.close.values, df.volume.values)
    
    # Step 3: 量子跃迁信号
    leap = quantum_leap_signal(df.close.values, df.volume.values)
    
    # Step 4: 背离检测
    divergence = detect_divergence(df)
    
    # 综合决策
    if season == "春" and leap["signal"] == "量子跃迁":
        return {"action": "BUY", "reason": "春+量子跃迁", "strength": leap["strength"]}
    elif season == "夏" and leap["signal"] == "量子跃迁" and leap["strength"] > 3.0:
        return {"action": "BUY", "reason": "夏+强量子跃迁", "strength": leap["strength"]}
    elif season == "秋" and leap["signal"] == "量子跃迁":
        return {"action": "SELL", "reason": "秋+量子跃迁", "strength": leap["strength"]}
    elif divergence["type"] == "strong" and season in ["春", "夏"]:
        return {"action": "SELL", "reason": f"{season}强背离预警", "strength": divergence["strength"]}
    
    return {"action": "HOLD", "reason": "无有效信号"}
```

---

## 待验证

- [ ] 用历史数据回测四季判定准确率
- [ ] 量子跃迁信号的边界参数优化
- [ ] 与现有GTN策略对比：谁判断"临界点"更准
- [ ] 宏观流动性因子引入（需找信贷数据源）
- [ ] 多标的联动（BTC/ETH/SOL的季节是否同步）
