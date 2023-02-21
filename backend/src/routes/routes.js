const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/auth').verifyToken;

router.post('/signup', userController.signup);
router.post('/login', userController.login);
router.post('/refresh-tokens', userController.refreshTokens);
router.get('/protected', authMiddleware, (req, res) => {
  res.json({ message: 'You are authorized to access this route.' });
});

module.exports = router;
