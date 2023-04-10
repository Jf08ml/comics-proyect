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
    description: {
      type: String,
      required: true
    },
    typeContent: {
        type: String,
        required: true
    },
    keywords: {
        type: Array,
        required: true
    },
    imagesPost : {
        type: Array,
        required: true
    },
    comicPartOf: {
      type: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comic'
      }],
      default: []
    },
    views: {
      type: Number,
      default: 0
    },
    uploadData: {
      type: Date,
      default: Date.now
    }
    
  });
  


module.exports = mongoose.model('Comic', comicSchema);