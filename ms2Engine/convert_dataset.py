import pandas as pd

# 1) CHANGE this to your actual Kaggle filename
RAW_FILE = "crypto_prices.csv"   # e.g. "cryptocurrencypricehistory.csv"

# 2) Load the raw Kaggle data (like the Aave table you pasted)
df = pd.read_csv(RAW_FILE)

# 3) Filter the single coin you care about now (Aave)
df_aave = df[df["Name"] == "Aave"].copy()

# 4) Keep only Date and Close price
df_aave = df_aave[["Date", "Close"]].rename(columns={
    "Close": "AAVE_Price"
})

# 5) Sort by Date and save as dataset.csv
df_aave = df_aave.sort_values("Date")
df_aave.to_csv("dataset.csv", index=False)

print("dataset.csv created with columns:", df_aave.columns.tolist())
