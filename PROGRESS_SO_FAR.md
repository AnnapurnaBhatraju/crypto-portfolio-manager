Progress-Chetana

Date:22 Nov 2025

Milestone: Basic Environment Setup + Pandas Verification + Project Theory Document

✔ Milestone Summary (Pandas Setup & Verification)

1. Pandas Installation Completed

Installed using: pip install pandas.

Verified installation with: pip show pandas.

Confirmed version and package metadata.

2. Crypto Price History CSV Prepared

Downloaded sample Bitcoin/Ethereum historical price dataset.

Saved CSV file into the project directory for testing.

3. Data Loading & Verification Script

Created a Python script to:

import pandas (import pandas as pd)

load CSV using pd.read_csv()

display first 5 rows using df.head().

Successfully executed the script in VS Code/terminal.

Verified pandas functionality and version using pd.__version__.

No errors — data displayed correctly.

🎯 Milestone-1 – Theory + Architecture Overview

1. Project Overview

Project Statement

Crypto Portfolio Manager built using Python’s native math tools, parallel processing for simultaneous risk checks, SQLite for time-series storage, CSV imports/exports, automated email alerts, rule-based asset mixing, return predictions, and dynamic allocation strategies — all fully risk-aware and using no external trading-specific libraries.

Core Outcomes

Rule-based portfolio optimization (maximize returns, minimize risk)

Parallel risk analysis for high-speed evaluation

Customizable performance reports with rebalancing suggestions

Automated alert system (risk spikes, return drops)

Intelligent allocation rules based on Sharpe Ratio & predictions

2. Sharpe Ratio – Theory & Module Plan
Formula
Sharpe Ratio=Rp-Rf/𝜎𝑝	​

Parameters:

Rp – Portfolio Return
(Example values: BTC 0.21% daily, ETH 0.51% daily)

Rf – Risk-free Rate
(3–5% US Treasury yield)

σp – Standard Deviation of portfolio returns

Interpretation

Sharpe > 1.0: Good, acceptable risk-adjusted returns

Sharpe > 2.0: Excellent

Example:

BTC Return = 15%
Risk-Free = 5%
Volatility = 12%
→ Sharpe ≈ 0.83 (needs better diversification)

Usage in Project

Integrated into a RiskChecker module.

Output helps determine weight allocation during mixing.

3. Parallel Processing Strategy (Real-Time Risk Engine)
Problem

Sequential risk calculations slow down when analyzing multiple crypto assets simultaneously (BTC, ETH, ADA, etc.)

Solution – ProcessPoolExecutor

Bypasses Python GIL; enables true parallel CPU-based tasks.

from concurrent.futures import ProcessPoolExecutor
import numpy as np

def calculate_sharpe(asset_prices):
    returns = np.diff(np.log(asset_prices))
    return (returns.mean() - 0.03) / returns.std()

assets = [btc_prices, eth_prices, ada_prices]

with ProcessPoolExecutor(max_workers=4) as executor:
    sharpe_ratios = list(executor.map(calculate_sharpe, assets))

Benefit

Achieved 4× speedup on a quad-core CPU.

Integrated into Investment Mix Calculator for faster evaluations.

4. Data Plan & Preprocessing Decisions
Primary Data Sources

Bitcoin: GitHub (daily prices, 2010–present)

Ethereum: Kaggle (minute-level OHLC data)

Storage Choice

SQLite database: trends.db

Stores processed prices, daily returns, and volatility.

Processing Pipeline
Raw CSV  
→ pandas DataFrame  
→ daily returns using price.pct_change()  
→ SQLite storage  

Initial Assets for Analysis

BTC

ETH 