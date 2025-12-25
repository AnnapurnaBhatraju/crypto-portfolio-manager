from pathlib import Path
from typing import Dict

BASE_DIR = Path(__file__).resolve().parent.parent

_SIMULATED_PRICES: Dict[str, float] = {
    "BTC": 30020.45,
    "ETH": 1800.00,
    "ADA": 0.45
}

def get_simulated_price(coin: str) -> float:
    price = _SIMULATED_PRICES.get(coin.upper())
    if price is None:
        raise KeyError(f"Simulated price not available for coin: {coin}")
    return round(price, 2)
