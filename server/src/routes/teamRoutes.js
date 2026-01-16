const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const teamController = require('../controllers/teamController');

router.get('/', auth, teamController.getTeam);
router.post('/invite', auth, teamController.inviteMember);
router.delete('/:id', auth, teamController.removeMember);

module.exports = router;
