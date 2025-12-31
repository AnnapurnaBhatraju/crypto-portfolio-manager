# rules_engine.py

def apply_rules(portfolio, volatility_level):
    """
    portfolio: dict with coin percentages
    example: {"BTC": 50, "ETH": 30, "USDT": 20}

    volatility_level: HIGH / MEDIUM / LOW
    """

    if volatility_level == "HIGH":
        if "BTC" in portfolio and "USDT" in portfolio:
            portfolio["BTC"] -= 10
            portfolio["USDT"] += 10

    elif volatility_level == "MEDIUM":
        if "BTC" in portfolio and "USDT" in portfolio:
            portfolio["BTC"] -= 5
            portfolio["USDT"] += 5

    # LOW volatility → no change

    return portfolio
