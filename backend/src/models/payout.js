const mongoose = require('mongoose')

const payoutSchema = new mongoose.Schema({
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    balance: {
      type: Number,
      required: true
    },
    amount: {
      type: Number,
      required: true
    },
    emailPaypal: {
      type: String,
      required: true
    },
    pagado: {
        type: Boolean
    }
  });
  


module.exports = mongoose.model('Payout', payoutSchema);