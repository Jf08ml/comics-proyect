const mongoose = require('mongoose')

const payoutSchema = new mongoose.Schema({
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    emailPaypal: {
      type: String,
      required: true
    },
    balance: {
      type: Number,
      required: true
    },
    payouts: {
      type: [
        new mongoose.Schema({
          amount: {
            type: Number
          },
          pagado: {
            type: Boolean
          }
        })
      ]
    }
    
  });
  


module.exports = mongoose.model('Payout', payoutSchema);