const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth'); // Your JWT authentication middleware
const { 
    getPortfolio, 
    updateAsset, 
    deleteAsset 
} = require('../controllers/portfolioController');

// Route: GET api/portfolio (Fetches DB data + Live Prices)
router.get('/', auth, getPortfolio);

// Route: PUT api/portfolio/:id (Update Logic)
router.put('/:id', auth, updateAsset);

// Route: DELETE api/portfolio/:id (Purge Logic)
router.delete('/:id', auth, deleteAsset);

module.exports = router;