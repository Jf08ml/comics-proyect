const mongoose = require('mongoose')

const serieSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        default: mongoose.Types.ObjectId // Esto generará un nuevo ObjectId único por defecto
      },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
      },
    name: {
        type: String,
        required: true
    },
    parts: {
        type: Array
    }
});

module.exports = mongoose.model('Serie', serieSchema);