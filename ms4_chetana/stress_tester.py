# ms4_chetana/stress_tester.py

from ms4_chetana.risk_logic import get_risk_status


def stress_test_large_portfolio():
    print("\n LARGE PORTFOLIO STRESS TEST")

    simulated_price = 100

    # simulate 100 assets increasing gradually
    for i in range(1, 101):
        live_price = simulated_price + (i * 0.3)  # deterministic change
        status = get_risk_status(live_price, simulated_price)

        if i <= 10 or i == 100:
            print(f"Asset {i}: Live={round(live_price,2)}, Status={status}")

    print("Large portfolio stress test completed.\n")


def continuous_refresh_test():
    print("\n🔁 CONTINUOUS REFRESH TEST")

    simulated_price = 100

    for i in range(1, 11):
        live_price = simulated_price + (i - 5)  # predictable variation
        status = get_risk_status(live_price, simulated_price)
        print(f"Refresh {i}: Live={round(live_price,2)}, Status={status}")

    print("Continuous refresh test completed.\n")
