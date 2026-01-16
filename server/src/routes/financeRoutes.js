const express = require('express');
const router = express.Router();
const financeController = require('../controllers/financeController');
const auth = require('../middleware/authMiddleware');

router.post('/', auth, financeController.createFinanceRecord);
router.get('/', auth, financeController.getFinances);
router.get('/summary', auth, financeController.getFinanceSummary);

module.exports = router;
