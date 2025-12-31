# rules_api.py

from rules_engine import apply_rules

def apply_rules_service(data: dict):
    """
    Expected input:
    {
        "portfolio": {"BTC": 50, "ETH": 30, "USDT": 20},
        "volatility": "HIGH"
    }
    """
    portfolio = data.get("portfolio")
    volatility = data.get("volatility")

    updated_portfolio = apply_rules(portfolio, volatility)
    return updated_portfolio
