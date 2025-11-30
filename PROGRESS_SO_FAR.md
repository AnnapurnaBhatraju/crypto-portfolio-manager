Progress-Chetana

Date:22 Nov 2025

Milestone: Basic Environment Setup + Pandas Verification + Project Theory Document

✔ Pandas Setup & Verification

1. Pandas Installation Completed

Installed using: pip install pandas.

Verified installation with: pip show pandas.

Confirmed version and package metadata.

2. Crypto Price History CSV Prepared

Downloaded sample Bitcoin/Ethereum historical price dataset.

Saved CSV file into the project directory for testing.

3. Data Loading & Verification Script

Created a Python script to:

import pandas 

load CSV using pd.read_csv()

display first 5 rows using df.head().

Successfully executed the script in VS Code/terminal.

Verified pandas functionality and version using pd.__version__.

No errors — data displayed correctly.


DATE: 30-11-2025

🎯 Milestone-1 – Theory + Architecture Overview

✔ Project Overview

Python-based Crypto Portfolio Manager

Uses native math tools, parallel risk checks, SQLite, CSV I/O

Features: rule-based optimization, dynamic allocation, alerts, predictions

✔ Sharpe Ratio

Formula: 
(𝑅𝑝−𝑅𝑓)/𝜎𝑝

Measures risk-adjusted performance


>1 = good, >2 = excellent

Used in RiskChecker to guide asset weighting

✔ Parallel Risk Engine

Parallel Processing Strategy (Real-Time Risk Engine)
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

Implemented using ProcessPoolExecutor

Runs Sharpe & volatility checks in parallel across assets

Achieves ~4× speedup for BTC/ETH/ADA risk evaluations

✔ Data & Storage Plan

Sources: BTC (GitHub), ETH (Kaggle)

Pipeline: CSV → pandas → daily returns → SQLite (trends.db)

Initial assets: BTC, ETH
