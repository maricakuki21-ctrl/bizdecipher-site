#!/usr/bin/env python3
"""
T指标策略 - 5倍杠杆回测（实时T值，无未来函数）
修正版：指导周期只使用当前执行时点之前可见的1m数据
"""

import pandas as pd
import numpy as np
import gzip
from datetime import timedelta
from pathlib import Path
import warnings
warnings.filterwarnings("ignore")

FEE = 0.0005
SLIPPAGE = 0.0008
TOTAL_COST = FEE + SLIPPAGE
LEVERAGE = 5

PARAMS = {
    'BTC': {'p': 20, 'lb': 100, 'pw': 0.3, 'thr_l': 0.8, 'thr_s': 0.6, 'exit_thr': -0.3, 'stop_pct': 0.05, 'cooldown': 6},
    'ETH': {'p': 20, 'lb': 100, 'pw': 0.3, 'thr_l': 0.8, 'thr_s': 0.6, 'exit_thr': -0.3, 'stop_pct': 0.05, 'cooldown': 6},
    'SOL': {'p': 15, 'lb': 80, 'pw': 0.3, 'thr_l': 0.7, 'thr_s': 0.525, 'exit_thr': -0.3, 'stop_pct': 0.05, 'cooldown': 6},
    'default': {'p': 20, 'lb': 100, 'pw': 0.3, 'thr_l': 0.8, 'thr_s': 0.6, 'exit_thr': -0.3, 'stop_pct': 0.05, 'cooldown': 6}
}


def load_1m(symbol, days=60):
    paths = [
        f"C:/Users/闲云野鹤/Desktop/OKX_Kline_Data_20260320_125406/okx_90d/{symbol}_1m_90d.csv.gz",
        f"C:/Users/闲云野鹤/Documents/New project/data/okx_90d/{symbol}_1m_90d.csv.gz",
    ]
    for p in paths:
        if Path(p).exists():
            with gzip.open(p, 'rt') as f:
                df = pd.read_csv(f)
            df['timestamp'] = pd.to_datetime(df['timestamp'], unit='ms')
            df = df.sort_values('timestamp')
            cutoff = df['timestamp'].max() - timedelta(days=days)
            return df[df['timestamp'] >= cutoff].reset_index(drop=True)
    return None


def calc_T(close, p=20, lb=100, pw=0.3):
    s = pd.Series(np.array(close).astype(float))
    ep = s.ewm(span=p, adjust=False).mean()
    zi = (s - ep) / (ep + 1e-12)
    I = (zi - zi.rolling(lb).mean()) / (zi.rolling(lb).std(ddof=1) + 1e-12)
    cv = s.rolling(p).std(ddof=1) / (s.rolling(p).mean() + 1e-12)
    M = (cv - cv.rolling(lb).mean()) / (cv.rolling(lb).std(ddof=1) + 1e-12)
    dp = (pw * (1 + 0.5 * s.pct_change(p))).clip(lower=pw * 0.3).fillna(pw)
    return (I - dp * M).values


def build_exec_df(df_1m, guide_rule='1h', exec_rule='15min'):
    df_1m = df_1m.copy()
    df_1m['exec_time'] = df_1m['timestamp'].dt.floor(exec_rule)
    df_1m['guide_time'] = df_1m['timestamp'].dt.floor(guide_rule)

    exec_bars = []
    for exec_time, group in df_1m.groupby('exec_time', sort=True):
        exec_bars.append({
            'timestamp': exec_time,
            'open': group['open'].iloc[0],
            'high': group['high'].max(),
            'low': group['low'].min(),
            'close': group['close'].iloc[-1],
            'guide_time': group['guide_time'].iloc[0],
        })
    return pd.DataFrame(exec_bars), df_1m


def compute_realtime_guide_T(exec_df, df_1m, guide_rule, p, lb, pw):
    out = []
    for _, row in exec_df.iterrows():
        current_exec_time = row['timestamp']
        visible_1m = df_1m[df_1m['timestamp'] <= current_exec_time]
        if visible_1m.empty:
            out.append(np.nan)
            continue

        current_guide_time = current_exec_time.floor(guide_rule)
        hist_guide = visible_1m[visible_1m['timestamp'] < current_guide_time]
        hist_guide_closes = hist_guide.resample(guide_rule, on='timestamp')['close'].last().dropna()

        current_guide_visible = visible_1m[visible_1m['timestamp'] >= current_guide_time]
        if current_guide_visible.empty:
            out.append(np.nan)
            continue
        current_guide_close = current_guide_visible['close'].iloc[-1]

        if len(hist_guide_closes) >= lb:
            all_closes = list(hist_guide_closes.values) + [current_guide_close]
            t_values = calc_T(all_closes, p, lb, pw)
            out.append(t_values[-1])
        else:
            out.append(np.nan)
    return out


def backtest_leverage(df_1m, guide_rule='1h', exec_rule='15min', params=None, leverage=5):
    if params is None:
        params = PARAMS['default']

    p, lb, pw = params['p'], params['lb'], params['pw']
    thr_l, thr_s = params['thr_l'], params['thr_s']
    exit_thr, stop_pct, cd = params['exit_thr'], params['stop_pct'], params['cooldown']

    exec_df, df_1m = build_exec_df(df_1m, guide_rule, exec_rule)
    if len(exec_df) < lb + 10:
        return None

    exec_df['T_exec'] = calc_T(exec_df['close'].values, p, lb, pw)
    exec_df['T_exec_prev'] = exec_df['T_exec'].shift(1)
    exec_df['T_guide'] = compute_realtime_guide_T(exec_df, df_1m, guide_rule, p, lb, pw)
    exec_df = exec_df.dropna().reset_index(drop=True)

    if len(exec_df) < 30:
        return None

    c = exec_df['close'].values
    o = exec_df['open'].values
    h = exec_df['high'].values
    l = exec_df['low'].values
    T_exec = exec_df['T_exec'].values
    T_exec_prev = exec_df['T_exec_prev'].values
    T_guide = exec_df['T_guide'].values

    eq, pos, trades = 100.0, None, []
    le = -cd - 1
    equity = [eq]
    liquidation = False

    for i in range(1, len(c)):
        if pos:
            if pos['s'] == 'long':
                drawdown = (pos['entry'] - l[i]) / pos['entry']
                if drawdown * leverage >= 1.0:
                    liquidation = True
                    pnl = -1.0
                    eq *= (1 + pnl)
                    trades.append({'pnl': pnl * 100, 'side': pos['s'], 'reason': 'liquidation'})
                    break
            else:
                drawdown = (h[i] - pos['entry']) / pos['entry']
                if drawdown * leverage >= 1.0:
                    liquidation = True
                    pnl = -1.0
                    eq *= (1 + pnl)
                    trades.append({'pnl': pnl * 100, 'side': pos['s'], 'reason': 'liquidation'})
                    break

        if pos and not liquidation:
            ep = None
            if pos['s'] == 'long' and l[i] <= pos['sl']:
                ep = pos['sl'] * (1 - SLIPPAGE)
            elif pos['s'] == 'short' and h[i] >= pos['sl']:
                ep = pos['sl'] * (1 + SLIPPAGE)

            if ep is None:
                if pos['s'] == 'long' and T_exec[i] < exit_thr:
                    ep = o[i] * (1 - SLIPPAGE)
                elif pos['s'] == 'short' and T_exec[i] > -exit_thr:
                    ep = o[i] * (1 + SLIPPAGE)

            if ep is not None:
                gross_pnl = (ep - pos['entry']) / pos['entry'] * (1 if pos['s'] == 'long' else -1)
                leveraged_pnl = gross_pnl * leverage
                net_pnl = leveraged_pnl - 2 * TOTAL_COST
                eq *= (1 + net_pnl)
                trades.append({'pnl': net_pnl * 100, 'side': pos['s'], 'reason': 'exit'})
                pos, le = None, i

        if not pos and (i - le) > cd and not liquidation and not np.isnan(T_guide[i]):
            if T_guide[i] > 0 and T_exec_prev[i] <= thr_l and T_exec[i] > thr_l:
                ep = o[i] * (1 + SLIPPAGE)
                sl_dist = stop_pct / leverage
                sl = ep * (1 - sl_dist)
                pos = {'s': 'long', 'entry': ep, 'sl': sl}
            elif T_guide[i] < 0 and T_exec_prev[i] >= -thr_s and T_exec[i] < -thr_s:
                ep = o[i] * (1 - SLIPPAGE)
                sl_dist = stop_pct / leverage
                sl = ep * (1 + sl_dist)
                pos = {'s': 'short', 'entry': ep, 'sl': sl}

        equity.append(eq)
        if liquidation:
            break

    if not trades:
        return None

    ret = sum(t['pnl'] for t in trades)
    eq_s = pd.Series(equity)
    max_dd = ((eq_s - eq_s.cummax()) / eq_s.cummax()).min() * 100
    hold_ret = (exec_df['close'].iloc[-1] / exec_df['close'].iloc[0] - 1) * 100 * leverage
    wins = [t for t in trades if t['pnl'] > 0]
    wr = len(wins) / len(trades) * 100

    return {
        'ret': ret,
        'dd': max_dd,
        'calmar': ret / abs(max_dd) if max_dd else 0,
        'hold': hold_ret,
        'excess': ret - hold_ret,
        'n': len(trades),
        'wr': wr,
        'liquidation': liquidation,
    }


def main():
    symbol = 'SOL'
    guide = '1h'
    exec_r = '15min'
    days = 60
    print('=' * 70)
    print('T指标策略 - 5倍杠杆回测（实时T值，无未来函数，修正版）')
    print('=' * 70)
    print(f'测试: {symbol} {guide}->{exec_r} {days}天')
    df = load_1m(symbol, days)
    if df is None:
        print('无数据')
        return
    params = PARAMS.get(symbol, PARAMS['default'])
    r = backtest_leverage(df, guide, exec_r, params, leverage=LEVERAGE)
    if not r:
        print('无交易')
        return
    print(r)


if __name__ == '__main__':
    main()
