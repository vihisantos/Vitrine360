const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');
const authMiddleware = require('../middleware/authMiddleware'); // Optional for webhooks, required for subscriptions

// Protected routes (User must be logged in to subscribe or verify)
router.post('/verify-card', authMiddleware, paymentController.verifyCard);
router.post('/subscription', authMiddleware, paymentController.createSubscriptionPreference);

// Public route (Webhook calls us)
router.post('/webhook', paymentController.handleWebhook);

module.exports = router;
