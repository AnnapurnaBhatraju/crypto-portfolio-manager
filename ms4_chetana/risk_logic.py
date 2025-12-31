# ms4_chetana/risk_logic.py

def get_risk_status(live_price: float, simulated_price: float):
    if simulated_price == 0:
        return "Undefined"

    variance = ((live_price - simulated_price) / simulated_price) * 100

    if abs(variance) < 2:
        return "Stable"
    elif 2 <= abs(variance) <= 5:
        return "Warning"
    else:
        return "Danger"
