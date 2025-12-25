from ms3_chetana.mock_live_prices import MOCK_LIVE_PRICES
from ms3_chetana.risk_engine import generate_risk_badge

def main():
    print("\n--- MS3 Risk Engine Demo ---\n")

    for coin, live_price in MOCK_LIVE_PRICES.items():
        result = generate_risk_badge(coin, live_price)

        print(f"Coin: {result['coin']}")
        print(f" Simulated Price : {result['simulated_price']}")
        print(f" Live Price      : {result['live_price']}")
        print(f" Variance (%)    : {result['variance_percent']}")
        print(f" Status          : {result['status']} {result['badge']}")
        print("-" * 40)

if __name__ == "__main__":
    main()
