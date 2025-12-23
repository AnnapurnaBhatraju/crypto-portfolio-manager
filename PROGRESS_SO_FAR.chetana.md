PROGRESS-Chetana

DATE:22 Nov 2025

Milestone: Basic Environment Setup + Pandas Verification + Project Theory Document

✔ Pandas Setup & Verification

✔ Pandas Installation Completed

-Installed using: pip install pandas.

-Verified installation with: pip show pandas.

-Confirmed version and package metadata.

✔ Crypto Price History CSV Prepared

-Downloaded sample Bitcoin/Ethereum historical price dataset.

-Saved CSV file into the project directory for testing.

✔ Data Loading & Verification Script

-Created a Python script to:

import pandas 

load CSV using pd.read_csv()

display first 5 rows using df.head().

-Successfully executed the script in VS Code/terminal.

-Verified pandas functionality and version using pd.__version__.

-No errors — data displayed correctly.


DATE: 30-11-2025

🎯 Milestone-1 – Theory + Architecture Overview

✔ Project Overview

Python-based Crypto Portfolio Manager

-Uses native math tools, parallel risk checks, SQLite, CSV I/O

-Features: rule-based optimization, dynamic allocation, alerts, predictions

✔ Sharpe Ratio

Formula: 
(𝑅𝑝−𝑅𝑓)/𝜎𝑝

-Measures risk-adjusted performance


>1 = good, >2 = excellent

Used in RiskChecker to guide asset weighting

✔ Parallel Risk Engine

-Parallel Processing Strategy (Real-Time Risk Engine)

Problem

-Sequential risk calculations slow down when analyzing multiple crypto assets simultaneously (BTC, ETH, ADA, etc.)

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

-Implemented using ProcessPoolExecutor

-Runs Sharpe & volatility checks in parallel across assets

-Achieves ~4× speedup for BTC/ETH/ADA risk evaluations

✔ Data & Storage Plan

-Sources: BTC (GitHub), ETH (Kaggle)

-Pipeline: CSV → pandas → daily returns → SQLite (trends.db)

-Initial assets: BTC, ETH

🎯22 December 2025
Milestone-2:Math & Concurrency Engine 

✔Developed a Python module to compute logarithmic returns from dataset.csv for multiple assets.

✔Implemented a Monte Carlo portfolio optimization framework with 10,000 simulation iterations to identify the portfolio configuration yielding the maximum Sharpe Ratio.

✔Leveraged Python’s multiprocessing library to execute Monte Carlo trials concurrently, significantly improving computational efficiency.

✔Designed a modular function that accepts a list of coins/assets as input and returns the optimal portfolio weights corresponding to the maximum Sharpe Ratio.

✔Verified the accuracy of mathematical computations (returns, volatility, Sharpe Ratio) and validated correct parallel execution.
✔Finalized and pushed the verified .py implementation to the designated feature branch.
