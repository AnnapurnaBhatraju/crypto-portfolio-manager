# ms4_chetana/market_scenarios.py

from ms4_chetana.risk_logic import get_risk_status


def bull_market_test():
    print("\n BULL MARKET TEST")
    simulated = 100
    live = 120
    status = get_risk_status(live, simulated)
    print(f"Simulated={simulated}, Live={live}, Status={status}")


def bear_market_test():
    print("\n BEAR MARKET TEST")
    simulated = 100
    live = 75
    status = get_risk_status(live, simulated)
    print(f"Simulated={simulated}, Live={live}, Status={status}")


def volatile_market_test():
    print("\n VOLATILE MARKET TEST")
    prices = [(100, 95), (100, 110), (100, 85), (100, 105)]
    for simulated, live in prices:
        status = get_risk_status(live, simulated)
        print(f"Simulated={simulated}, Live={live}, Status={status}")


def edge_case_test():
    print("\n⚠ EDGE CASE TEST")
    tests = [(0, 0), (100, 0), (0, 100), (100, 100)]

    for simulated, live in tests:
        try:
            status = get_risk_status(live, simulated)
        except Exception as e:
            status = f"ERROR → {e}"
        print(f"Simulated={simulated}, Live={live}, Status={status}")
