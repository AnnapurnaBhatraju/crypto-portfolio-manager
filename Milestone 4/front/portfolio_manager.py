import pandas as pd
import os

# Current 2025 Market data
MARKET_DATA = {
    {
    'Crypto': ['Bitcoin', 'Ethereum', 'Solana', 'Cardano', 'Dogecoin', 
               'XRP', 'Litecoin', 'Polkadot', 'Polygon', 'Chainlink', 
               'Avalanche', 'Tron', 'Uniswap', 'Cosmos', 'Monero', 
               'Stellar', 'Near', 'Optimism', 'Algorand', 'Aave'],
    
    'Price': [108000.00, 5800.00, 420.00, 2.85, 0.92,
              4.80, 285.00, 38.00, 4.20, 92.00,
              145.00, 0.48, 42.00, 48.00, 480.00,
              1.15, 28.00, 12.50, 2.10, 380.00],
    
    'Status': ['STABLE', 'STABLE', 'WARNING', 'WARNING', 'DANGER',
               'STABLE', 'STABLE', 'WARNING', 'WARNING', 'STABLE',
               'WARNING', 'DANGER', 'WARNING', 'WARNING', 'STABLE',
               'DANGER', 'WARNING', 'WARNING', 'DANGER', 'STABLE']
}
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
    path = os.path.join(os.path.dirname(__file__), '../ms2_engine/dataset.csv')
    df.to_csv(path, index=False)