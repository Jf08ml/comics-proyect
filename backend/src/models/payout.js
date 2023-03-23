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
          _id: {
            type: mongoose.Schema.Types.ObjectId,
            default: mongoose.Types.ObjectId
          },
          amount: {
            type: Number
          },
          pagado: {
            type: Boolean
          },
          dateRequest: {
            type: Date,
            default: Date.now
          }
        })
      ]
    }
    
  });
  


module.exports = mongoose.model('Payout', payoutSchema);