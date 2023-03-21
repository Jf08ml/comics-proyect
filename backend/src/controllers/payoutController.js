const jwt = require('jsonwebtoken');
const { JWT_SECRET, JWT_EXPIRATION, JWT_REFRESH_SECRET, JWT_REFRESH_EXPIRATION } = process.env;
const Payout = require('../models/payout');
const User = require('../models/users');

async function savePayout(req, res) {
  const { balance, amount, emailPaypal, pagado } = req.body;
  try {
    const token = req.headers['authorization'];// El separador en el método split debe ser un espacio
    const decodedToken = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decodedToken.id);

    const payout = new Payout({
      user: user._id,
      balance: balance,
      amount: amount,
      emailPaypal: emailPaypal,
      pagado: pagado
    });

    await payout.save();

    const remainingBalance = balance - amount;
    res.status(200).json({ result: 'success', message: 'Payment requested successfully', remainingBalance: remainingBalance });
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
  savePayout
}