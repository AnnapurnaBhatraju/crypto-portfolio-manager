from ms3_chetana.simulated_price_reader import get_simulated_price

def calculate_variance(simulated: float, live: float) -> float:
    return abs(live - simulated) / simulated * 100


def generate_risk_badge(coin: str, live_price: float) -> dict:
    simulated_price = get_simulated_price(coin)
    variance = calculate_variance(simulated_price, live_price)

    if variance < 2:
        status = "STABLE"
        badge = "🟢"
    elif variance <= 5:
        status = "WARNING"
        badge = "🟡"
    else:
        status = "DANGER"
        badge = "🔴"

    return {
        "coin": coin,
        "simulated_price": simulated_price,
        "live_price": live_price,
        "variance_percent": round(variance, 2),
        "status": status,
        "badge": badge
    }
