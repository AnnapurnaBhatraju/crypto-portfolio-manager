import pandas as pd
import os

# Check current directory and files
print("Current directory:", os.getcwd())
print("Files present:", os.listdir('.'))

# Load Bitcoin price history (your exact filename)
df = pd.read_csv('bitcoin_price.csv', header=None)
df.columns = ['Date', 'Price']

print("\nFirst 5 rows of Bitcoin prices:")
print(df.head())

print("\nPrice summary:")
print(df['Price'].describe())