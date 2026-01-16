def generate_risk_badge(purchase_price: float, live_price: float):
    """
    Milestone 3 Logic: Determines the color-coded status of an asset.
    - Green (STABLE): Price is up by more than 5%.
    - Yellow (WARNING): Price is within a +/- 5% range of purchase price.
    - Red (DANGER): Price has dropped more than 5%.
    """
    if live_price == 0:
        return {"badge": "⚪", "status": "UNKNOWN"}
    
    # Calculate percentage change from purchase price
    change = ((live_price - purchase_price) / purchase_price) * 100
    
    if change > 5:
        return {"badge": "🟢", "status": "STABLE"}
    elif -5 <= change <= 5:
        # The Milestone 3 "Yellow Badge" logic
        return {"badge": "🟡", "status": "WARNING"}
    else:
        return {"badge": "🔴", "status": "DANGER"}