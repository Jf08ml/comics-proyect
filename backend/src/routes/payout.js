const express = require('express');
const router = express.Router();
const payoutController = require('../controllers/payoutController');
const authMiddleware = require('../middleware/auth').verifyToken;


router.post('/payout', authMiddleware, payoutController.requestPayout)


module.exports = router;