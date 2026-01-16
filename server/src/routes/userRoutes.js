const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const userController = require('../controllers/userController');

router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);
router.get('/', auth, userController.getUsers);
router.put('/profile', auth, userController.updateProfile);
router.post('/generate-key', auth, userController.generateApiKey);

module.exports = router;
