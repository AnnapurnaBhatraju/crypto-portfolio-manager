import pandas as pd
import os

# Current 2025 Market data
MARKET_DATA = {
    'Crypto': ['Bitcoin', 'Ethereum', 'Solana', 'XRP', 'Cardano', 'Dogecoin'],
    'Price': [89581.00, 3018.49, 127.84, 1.86, 0.376, 0.127],
    'Status': ['STABLE', 'STABLE', 'STABLE', 'WARNING', 'WARNING', 'DANGER']
}

def generate_manual_mix(budget):
    df = pd.DataFrame(MARKET_DATA)
    # 50% Stable, 40% Warning (Forces XRP/ADA), 10% Danger
    weights = {'STABLE': 0.50, 'WARNING': 0.40, 'DANGER': 0.10}
    
    portfolio = []
    for zone, weight in weights.items():
        zone_coins = df[df['Status'] == zone]
        if not zone_coins.empty:
            amt = (budget * weight) / len(zone_coins)
            for _, coin in zone_coins.iterrows():
                portfolio.append({
                    'Coin': coin['Crypto'], 
                    'Zone': zone, 
                    'Allocation_USD': round(amt, 2),
                    'Units': round(amt / coin['Price'], 4)
                })
    return pd.DataFrame(portfolio)

def save_to_csv(data):
    df = pd.DataFrame(data)
    # Path to your existing dataset.csv
    path = os.path.join(os.path.dirname(__file__), '../core/dataset.csv')
    df.to_csv(path, index=False)