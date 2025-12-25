from ms3_chetana.risk_engine import calculate_variance

def test_stable():
    assert calculate_variance(100, 101) < 2

def test_warning():
    assert 2 <= calculate_variance(100, 104) <= 5

def test_danger():
    assert calculate_variance(100, 110) > 5
