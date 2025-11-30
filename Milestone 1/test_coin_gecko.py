# # CODE TO DEMONSTRATE REAL-TIME API CALL

# # CODE TO DEMONSTRATE REAL-TIME API CALL
# from pycoingecko import CoinGeckoAPI
# cg = CoinGeckoAPI()

# # Fetch the current price of Bitcoin in USD
# coin_id = 'abcd'
# price_data = cg.get_price(ids=coin_id, vs_currencies='usd')

# # price_data looks like: {'bitcoin': {'usd': 3462.04}}
# # We access the outer key (coin_id) and then the inner key ('usd')
# if coin_id in price_data and 'usd' in price_data[coin_id]:
#     current_price = price_data[coin_id]['usd']
#     print(f"\nCoin: {coin_id.upper()}")
#     print(f"Current Price (USD): ${current_price:,.2f}\n")
# else:
#     print(f"Error: Could not retrieve price for {coin_id}")


from pycoingecko import CoinGeckoAPI
cg = CoinGeckoAPI()

# Fetch prices for multiple coins in one API call
coin_ids = 'bitcoin,ethereum,solana,cardano'
multi_price_data = cg.get_price(ids=coin_ids, vs_currencies='usd')

# You can now loop through the results for a clean display:
print("\n--- Current Crypto Prices ---")
for coin, data in multi_price_data.items():
    price = data['usd']
    print(f"{coin.upper():<10}: ${price:,.2f}") 
print("----------------------------\n")