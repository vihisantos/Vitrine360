const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const auth = require('../middleware/authMiddleware');

const apiKeyMiddleware = require('../middleware/apiKeyMiddleware');

// Validates either JWT (via auth) OR x-api-key (via apiKeyMiddleware)
// Note: apiKeyMiddleware currently handles both internally or falls through.
// Optimized chain: apiKeyMiddleware first (checks token or key), then auth (checks token).
// If apiKeyMiddleware finds a key, it sets req.user and we might skip strict auth?
// Let's refine the chain. 
// authMiddleware STRICTLY requires token.
// so we need a unified middleware or chain them such that if one passes, we proceed.
// Simple way: Update authMiddleware to also accept API key or create a wrapper.
// For now, let's inject apiKeyMiddleware BEFORE auth. 
// If apiKeyMiddleware sees a key, it sets req.user.
// We need to modify authMiddleware to NOT error if req.user is already set.

router.post('/', apiKeyMiddleware, auth, productController.createProduct);
router.get('/', apiKeyMiddleware, auth, productController.getProducts);
router.put('/:id', apiKeyMiddleware, auth, productController.updateProduct);
router.delete('/:id', apiKeyMiddleware, auth, productController.deleteProduct);

module.exports = router;
