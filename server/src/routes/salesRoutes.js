const express = require('express');
const router = express.Router();
const salesController = require('../controllers/salesController');
const auth = require('../middleware/authMiddleware');
const apiKeyMiddleware = require('../middleware/apiKeyMiddleware');

router.post('/', apiKeyMiddleware, auth, salesController.createSale);
router.get('/', apiKeyMiddleware, auth, salesController.getSales);

module.exports = router;
