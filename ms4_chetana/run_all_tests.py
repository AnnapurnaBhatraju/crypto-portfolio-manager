# ms4_chetana/run_all_tests.py

from ms4_chetana.market_scenarios import (
    bull_market_test,
    bear_market_test,
    volatile_market_test,
    edge_case_test
)

from ms4_chetana.stress_tester import (
    stress_test_large_portfolio,
    continuous_refresh_test
)


if __name__ == "__main__":
    bull_market_test()
    bear_market_test()
    volatile_market_test()
    edge_case_test()
    stress_test_large_portfolio()
    continuous_refresh_test()
