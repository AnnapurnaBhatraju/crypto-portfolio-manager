from typing import Dict

# Update these values to be close to current 2025 market prices 
# to avoid constant "DANGER" status.
_SIMULATED_PRICES: Dict[str, float] = {
    "BITCOIN": 96000.00,
    "ETHEREUM": 2700.00,
    "SOLANA": 190.00,
    "CARDANO": 0.80,
    "LITECOIN": 95.00,
    "DOGECOIN": 0.35,
    "XRP": 2.40
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