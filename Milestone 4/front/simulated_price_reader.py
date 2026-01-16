from typing import Dict

# Update these values to be close to current 2025 market prices 
# to avoid constant "DANGER" status.
_SIMULATED_PRICES: Dict[str, float] = {
    "BITCOIN":    108000,    
    "ETHEREUM":    5800,     
    "SOLANA":       420,    
    "CARDANO":      2.85,   
    "DOGECOIN":     0.92,   
    "XRP":          4.80,   
    "LITECOIN":     285,    
    "POLKADOT":     38,     
    "POLYGON":     4.20,    
    "CHAINLINK":    92,     
    "AVALANCHE":   145,     
    "TRON":         0.48,   
    "UNISWAP":     42,      
    "COSMOS":      48,      
    "MONERO":      480,     
    "STELLAR":     1.15,    
    "NEAR":        28,      
    "OPTIMISM":    12.50,   
    "ALGORAND":    2.10,    
    "AAVE":        380      
}

def get_simulated_price(coin: str) -> float:
    # Standardize input: "Bitcoin" -> "BITCOIN"
    key = coin.upper().replace(" ", "")
    price = _SIMULATED_PRICES.get(key)
    
    if price is None:
        # Fallback: if coin is missing from this list, return 0 
        # (Risk engine will then handle it as live_price baseline)
        return 0.0
    
    return round(price, 2)