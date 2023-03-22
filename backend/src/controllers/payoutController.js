const jwt = require('jsonwebtoken');
const { JWT_SECRET, JWT_EXPIRATION, JWT_REFRESH_SECRET, JWT_REFRESH_EXPIRATION } = process.env;
const Payout = require('../models/payout');
const User = require('../models/users');

async function requestPayout(req, res) {
  const { balance, emailPaypal } = req.body.payoutData || {};
  console.log(req.body)
  try {
    const token = req.headers['authorization'];// El separador en el método split debe ser un espacio
    const decodedToken = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decodedToken.id);

    const payout = new Payout({
      user: user._id,
      balance: balance,
      emailPaypal: emailPaypal,
    });

    await payout.save();

    res.status(200).json({ result: 'success', message: 'Payment data save successfully' });
  } catch (error) {
    console.log(error)
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
  requestPayout
}