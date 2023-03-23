const jwt = require('jsonwebtoken');
const { JWT_SECRET, JWT_EXPIRATION, JWT_REFRESH_SECRET, JWT_REFRESH_EXPIRATION } = process.env;
const Payout = require('../models/payout');
const User = require('../models/users');

async function emailPayout(req, res) {
  try {
    const { balance, emailPaypal } = req.body.payoutData || {};

    const [existingEmailPaypal] = await Promise.all([
      Payout.findOne({ emailPaypal }),
    ]);

    if (existingEmailPaypal) {
      return res.status(400).json({ result: 'errorEmail', message: 'Email already exists' });
    }

    const token = req.headers['authorization'];
    const decodedToken = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decodedToken.id);

    const payout = new Payout({
      user: user._id,
      balance: balance,
      emailPaypal: emailPaypal,
    });

    await payout.save();

    res.status(200).json({ result: 'success', message: 'Payment method saved' });
  } catch (error) {
    console.log(error)
    res.status(500).json({ result: 'error', message: error });
  }
}

async function getUserPayments(req, res) {
  try {
    const token = req.headers['authorization'];
    const decodedToken = jwt.verify(token, JWT_SECRET);
    const userId = decodedToken.id;
    const userData = await Payout.find({ "user": userId })
    res.status(200).json({ userData })
  } catch (error) {
    res.status(500).json({ result: 'error', message: error });
  }
}

async function requestPayment(req, res) {
  try {
    const { dataRequestPayment } = req.body || {};

    const token = req.headers['authorization'];
    const decodedToken = jwt.verify(token, JWT_SECRET);
    const userId = decodedToken.id;

    const userData = await Payout.find({ "user": userId })
    const payout = await Payout.findById(userData[0]._id)

    if (payout.balance <= 0) {
      res.status(401).json({ result: "errorBalance", message: "No balance available" })
    } else {

      const remaining = payout.balance - dataRequestPayment.amount;

      payout.balance = remaining;
      payout.payouts.push(dataRequestPayment);

      await payout.save();
      res.status(200).json({ result: "success", message: "Payment request made", remaining: remaining })
    }
  } catch (error) {
    res.status(500).json({ result: 'error', message: error });
  }
}

async function getAllPaymentsUser(req, res) {
  try {
    const token = req.headers['authorization'];
    const decodedToken = jwt.verify(token, JWT_SECRET);
    const userId = decodedToken.id;
    const userData = await Payout.find({ "user": userId })

    res.status(200).json(userData[0].payouts);
  } catch (error) {
    res.status(500).json({ result: 'error', message: error });
  }
}

// // Obtener un pago y cargar el objeto de usuario correspondiente
// Payout.findOne({ _id: payoutId })
//   .populate('user')
//   .exec((err, payout) => {
//     if (err) {
//       console.error(err);
//     } else {
//       // Acceder al objeto de usuario completo a través del campo de referencia
//       console.log(payout.user.nickname);
//     }
//   });

module.exports = {
  emailPayout,
  getUserPayments,
  getAllPaymentsUser,
  requestPayment
}