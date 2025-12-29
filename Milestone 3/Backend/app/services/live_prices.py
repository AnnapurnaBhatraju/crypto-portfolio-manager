# File: Backend/live_prices.py
import requests

def get_live_prices(coin_list):
    """
    Fetches real-time prices from CoinGecko.
    
    Args:
        coin_list (list): A list of coin names (e.g., ['bitcoin', 'ethereum'])
        
    Returns:
        dict: {'bitcoin': 65000, 'ethereum': 3500}
    """
    if not coin_list:
        return {}

    # CoinGecko requires lowercase IDs (e.g., "Bitcoin" -> "bitcoin")
    # We join them with commas: "bitcoin,ethereum,solana"
    formatted_ids = ",".join([coin.lower().replace(" ", "-") for coin in coin_list])
    
    url = "https://api.coingecko.com/api/v3/simple/price"
    params = {
        "ids": formatted_ids,
        "vs_currencies": "usd"
    }

    try:
        response = requests.get(url, params=params)
        data = response.json()
        
        # Structure the data simply: { "Bitcoin": 65000.00 }
        clean_prices = {}
        for coin_id, price_data in data.items():
            # Capitalize first letter for display matching
            clean_prices[coin_id.capitalize()] = price_data['usd']
            
        return clean_prices
        
    except Exception as e:
        print(f"Error fetching from CoinGecko: {e}")
        return {"error": "Failed to fetch live prices"}