const axios = require('axios');

// Task 1: Fetch Live Prices
const getLiveCoinPrices = async (coinIds) => {
    try {
        // coinIds should be a comma-separated string: "bitcoin,ethereum,solana"
        if (!coinIds || coinIds.length === 0) return {};

        const response = await axios.get(
            `https://api.coingecko.com/api/v3/simple/price`, 
            {
                params: {
                    ids: coinIds,
                    vs_currencies: 'usd', // Change to 'inr' if needed
                    include_24hr_change: 'true' // Optional: adds 24h % change
                }
            }
        );

        // Returns object like: { bitcoin: { usd: 65000, usd_24h_change: 2.5 } }
        return response.data; 

    } catch (error) {
        console.error("CoinGecko API Error:", error.message);
        return null; // Return null so the app doesn't crash, just shows old data
    }
};

module.exports = { getLiveCoinPrices };