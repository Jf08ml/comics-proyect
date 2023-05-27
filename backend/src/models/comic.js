const mongoose = require('mongoose')

const comicSchema = new mongoose.Schema({
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    title: {
      type: String,
      required: true
    },
    imagesPost : {
        type: Array,
        required: true
    },
    views: {
      type: Number,
      default: 0
    },
    serie: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Serie'
    },
    uploadData: {
      type: Date,
      default: Date.now
    }
    
  });
  


module.exports = mongoose.model('Comic', comicSchema);