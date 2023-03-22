const express = require('express');
const router = express.Router();
const payoutController = require('../controllers/payoutController');
const authMiddleware = require('../middleware/auth').verifyToken;


router.post('/payout', authMiddleware, payoutController.emailPayout);
router.get('/userpayments', authMiddleware, payoutController.getUserPayments);
router.put('/requestpayment', authMiddleware, payoutController.requestPayment);


module.exports = router;