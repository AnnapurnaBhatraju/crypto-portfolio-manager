const Portfolio = require('../models/Portfolio'); // Assuming Mongoose model exists
const { getLiveCoinPrices } = require('../services/priceService');

// ---------------------------------------------------------
// GET: Monitor Portfolio (Merges DB Data + Live API Data)
// ---------------------------------------------------------
exports.getPortfolio = async (req, res) => {
    try {
        const userId = req.user.id; // Assuming auth middleware adds user to req

        // 1. Fetch user's assets from MongoDB
        const assets = await Portfolio.find({ user: userId });

        if (assets.length === 0) {
            return res.json({ portfolio: [], totalValue: 0 });
        }

        // 2. Extract Coin IDs for the API call (e.g., ['bitcoin', 'ethereum'])
        const coinIds = assets.map(asset => asset.coinId).join(',');

        // 3. Call the Pipeline (CoinGecko)
        const livePrices = await getLiveCoinPrices(coinIds);

        // 4. Merge Logic: Combine DB data with Live Price
        const enrichedPortfolio = assets.map(asset => {
            const currentPrice = livePrices?.[asset.coinId]?.usd || 0;
            const currentValue = currentPrice * asset.quantity;
            
            return {
                _id: asset._id,
                coinName: asset.coinName,
                quantity: asset.quantity,
                avgBuyPrice: asset.buyPrice,
                currentPrice: currentPrice,
                currentValue: currentValue,
                gainLoss: currentValue - (asset.buyPrice * asset.quantity)
            };
        });

        res.json(enrichedPortfolio);

    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};

// ---------------------------------------------------------
// TASK 2A: UPDATE Asset (PUT /portfolio/:id)
// ---------------------------------------------------------
exports.updateAsset = async (req, res) => {
    const { quantity, buyPrice } = req.body;

    // Build object to update
    const assetFields = {};
    if (quantity) assetFields.quantity = quantity;
    if (buyPrice) assetFields.buyPrice = buyPrice;

    try {
        let asset = await Portfolio.findById(req.params.id);

        if (!asset) return res.status(404).json({ msg: 'Asset not found' });

        // Security Check: Ensure user owns this asset
        if (asset.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'Not authorized' });
        }

        // Update logic
        asset = await Portfolio.findByIdAndUpdate(
            req.params.id,
            { $set: assetFields },
            { new: true } // Returns the updated document
        );

        res.json(asset);

    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};

// ---------------------------------------------------------
// TASK 2B: DELETE Asset (DELETE /portfolio/:id)
// ---------------------------------------------------------
exports.deleteAsset = async (req, res) => {
    try {
        const asset = await Portfolio.findById(req.params.id);

        if (!asset) return res.status(404).json({ msg: 'Asset not found' });

        // Security Check: Ensure user owns this asset
        if (asset.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'Not authorized' });
        }

        // Hard Delete: Purge from MongoDB
        await Portfolio.findByIdAndDelete(req.params.id);

        res.json({ msg: 'Asset removed from portfolio history' });

    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};