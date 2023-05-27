const mongoose = require("mongoose");

const serieSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    default: mongoose.Types.ObjectId, // Esto generará un nuevo ObjectId único por defecto
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  nameSerie: {
    type: String,
    required: true,
  },
  frontPage: {
    type: String,
  },
  description: {
    type: String,
    required: true,
  },
  typeContent: {
    type: String,
    required: true,
  },
  artist: {
    type: String,
    required: true
  },
  keywords: {
    type: Array,
    required: true,
  },
  partsSerie: [
    {
      type: mongoose.Schema.Types.ObjectId,
    },
  ],
  views: {
    type: Number,
    default: 0,
  },
  uploadData: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Serie", serieSchema);
