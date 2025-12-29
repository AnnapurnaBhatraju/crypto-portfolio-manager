
import pandas as pd
import numpy as np
from multiprocessing import Pool, cpu_count
import os

def calculate_log_returns(csv_path: str):
    """Transforms the long-format dataset.csv into a wide-format matrix."""
    df = pd.read_csv(csv_path)
    
    # Pivot using 'date' as index and 'crypto_name' as columns
    # We use 'mean' to handle any potential duplicate date/name entries
    wide_df = df.pivot_table(index='date', columns='crypto_name', values='close', aggfunc='mean')
    
    # Clean data: Forward fill and backward fill missing values
    wide_df = wide_df.ffill().bfill()
    
    # Calculate Log Returns: ln(Price_t / Price_t-1)
    log_returns = np.log(wide_df / wide_df.shift(1)).dropna()
    return log_returns, log_returns.columns.tolist()

def portfolio_sharpe(args):
    """Calculates Sharpe Ratio for a specific weight distribution."""
    weights, returns_df, cov_matrix, risk_free_rate = args
    portfolio_return = np.sum(returns_df.mean() * weights) * 252
    portfolio_volatility = np.sqrt(np.dot(weights.T, np.dot(cov_matrix * 252, weights)))
    
    if portfolio_volatility == 0: return -1.0, weights
    
    sharpe_ratio = (portfolio_return - risk_free_rate) / portfolio_volatility
    return float(sharpe_ratio), weights

def find_max_sharpe_weights(coins, log_returns_df, iterations=10000):
    """Runs 10k simulations in parallel and cleans results for JSON."""
    returns = log_returns_df[coins].dropna()
    cov_matrix = returns.cov()
    n_assets = len(coins)
    risk_free_rate = 0.02
    
    n_processes = min(cpu_count(), 4)
    sims_per_proc = iterations // n_processes
    
    all_results = []
    with Pool(processes=n_processes) as pool:
        for _ in range(n_processes):
            # Generate random weights that sum to 100%
            weights_chunk = np.random.dirichlet(np.ones(n_assets), sims_per_proc)
            args_chunk = [(w, returns, cov_matrix, risk_free_rate) for w in weights_chunk]
            all_results.extend(pool.map(portfolio_sharpe, args_chunk))
            
    best_result = max(all_results, key=lambda x: x[0])
    
    # Ensure float safety for JSON
    max_sharpe = float(best_result[0])
    if np.isnan(max_sharpe) or np.isinf(max_sharpe): max_sharpe = 0.0

    return {
        "max_sharpe_ratio": max_sharpe,
        "optimal_weights": {k: float(v) for k, v in zip(coins, best_result[1])}
    }