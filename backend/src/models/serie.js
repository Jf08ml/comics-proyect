const mongoose = require('mongoose')

const serieSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        default: mongoose.Types.ObjectId // Esto generará un nuevo ObjectId único por defecto
      },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
      },
    nameSerie: {
        type: String,
        required: true
    },
    partsSerie: [{
      type: mongoose.Schema.Types.ObjectId
  }]
  
});

module.exports = mongoose.model('Serie', serieSchema);