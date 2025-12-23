"""
 MATH & CONCURRENCY ENGINE 
 1. Log Returns from dataset.csv
 2. Monte Carlo Simulation (10,000 iterations)
 3. Multiprocessing (parallel execution)
 4. Returns Maximum Sharpe Ratio weights
"""

import pandas as pd
import numpy as np
from multiprocessing import Pool, cpu_count
import time
from pathlib import Path


# 1. LOG RETURNS CALCULATOR

def calculate_log_returns(csv_path: str = "dataset.csv"):
    """Calculate log returns: ln(Pt / Pt-1) for all coins"""
    print(" STEP 1: Calculating Log Returns from dataset.csv")

    # Load price data
    df = pd.read_csv(csv_path)
    print(f"    Loaded {df.shape[0]} days of data")

    # Auto-detect price columns (BTC_Price, ETH_Price, etc.)
    price_columns = [col for col in df.columns if col.endswith("_Price")]
    coins = [col.replace("_Price", "") for col in price_columns]

    log_returns = pd.DataFrame()

    # Calculate log returns for each coin
    for col in price_columns:
        prices = pd.to_numeric(df[col], errors="coerce").dropna()
        returns = np.log(prices / prices.shift(1)).dropna()  # ln(Pt/Pt-1)
        coin = col.replace("_Price", "")
        log_returns[coin] = returns

    print(f"    {len(coins)} coins processed → {log_returns.shape}")
    log_returns.to_csv("log_returns.csv", index=False)

    return log_returns, coins


# 2–4. PARALLEL MONTE CARLO ENGINE

def portfolio_sharpe(args):
    """Single portfolio calculation (runs in parallel process)"""
    weights, returns_df, cov_matrix, risk_free_rate = args

    # Annualized portfolio metrics (252 trading days)
    portfolio_return = np.sum(returns_df.mean() * weights) * 252
    portfolio_volatility = np.sqrt(
        np.dot(weights.T, np.dot(cov_matrix * 252, weights))
    )
    sharpe_ratio = (portfolio_return - risk_free_rate) / portfolio_volatility

    return sharpe_ratio, portfolio_return, portfolio_volatility, weights


def find_max_sharpe_weights(
    coins, log_returns_df, iterations: int = 10000
):
    """Monte Carlo simulation with multiprocessing → Best Sharpe weights"""
    print(f"\n STEP 2-4: {iterations:,} PARALLEL Monte Carlo simulations")
    start_time = time.time()

    # Prepare data
    returns = log_returns_df[coins].dropna()
    cov_matrix = returns.cov()
    n_assets = len(coins)
    risk_free_rate = 0.02  # 2% risk-free rate

    # Multiprocessing setup
    n_processes = min(cpu_count(), 8)
    simulations_per_process = iterations // n_processes

    all_results = []

    print(f"    Using {n_processes} CPU processes")

    # Parallel execution
    with Pool(processes=n_processes) as pool:
        for process_id in range(n_processes):
            # Generate random weights (Dirichlet distribution – sums to 1)
            n_sims = (
                simulations_per_process
                if process_id < n_processes - 1
                else iterations - (process_id * simulations_per_process)
            )
            weights_chunk = np.random.dirichlet(np.ones(n_assets), n_sims)

            # Arguments for parallel processing
            args_chunk = [
                (weight, returns, cov_matrix, risk_free_rate)
                for weight in weights_chunk
            ]

            # Execute in parallel
            results_chunk = pool.map(portfolio_sharpe, args_chunk)
            all_results.extend(results_chunk)

    # Results analysis
    elapsed_time = time.time() - start_time
    sharpe_ratios = np.array([result[0] for result in all_results])

    # Find BEST portfolio (max Sharpe ratio)
    best_index = np.argmax(sharpe_ratios)
    best_result = all_results[best_index]

    optimal_weights = dict(zip(coins, best_result[3]))

    print(f"    Completed in {elapsed_time:.2f}s")

    return {
        "coins": coins,
        "optimal_weights": optimal_weights,
        "max_sharpe_ratio": best_result[0],
        "expected_annual_return": best_result[1],
        "annual_volatility": best_result[2],
        "total_iterations": iterations,
        "processing_time_seconds": elapsed_time,
    }


# MAIN EXECUTION

def main():
    print(" " * 20)
    print("   MILESTONE 2: MATH & CONCURRENCY ENGINE")
    print(" " * 20)

    # VALIDATION
    if not Path("dataset.csv").exists():
        print(" ERROR: dataset.csv not found!")
        print(" Create dataset.csv with format:")
        print("Date,AAVE_Price  (or BTC_Price, ETH_Price, ...)")
        return

    # STEP 1: Calculate Log Returns
    log_returns_df, coin_list = calculate_log_returns()

    # STEPS 2–4: Parallel Monte Carlo Optimization
    optimization_result = find_max_sharpe_weights(
        coins=coin_list,
        log_returns_df=log_returns_df,
        iterations=10000,
    )

    # DISPLAY RESULTS
    print("\n" + "=" * 60)
    print("MILESTONE 2: ALL REQUIREMENTS COMPLETED!")
    print("=" * 60)
    print(f" Coins Analyzed: {', '.join(optimization_result['coins'])}")
    print(
        f" Total Simulations: {optimization_result['total_iterations']:,}"
    )
    print(
        f" Processing Time: {optimization_result['processing_time_seconds']:.2f}s"
    )
    print("\n BEST PORTFOLIO:")
    print(
        f"   Sharpe Ratio: {optimization_result['max_sharpe_ratio']:.4f}"
    )
    print(
        f"   Annual Return: {optimization_result['expected_annual_return']:.2%}"
    )
    print(
        f"   Volatility:   {optimization_result['annual_volatility']:.2%}"
    )

    print("\n OPTIMAL WEIGHTS:")
    for coin, weight in optimization_result["optimal_weights"].items():
        print(f"   {coin:>4}: {weight:>6.1%}")

    # SAVE RESULTS
    pd.DataFrame([optimization_result]).to_csv(
        "optimal_weights.csv", index=False
    )
    print("\n RESULTS SAVED:")
    print("   • log_returns.csv")
    print("   • optimal_weights.csv")
    print("\n   READY FOR GIT PUSH!")


if __name__ == "__main__":
    main()

