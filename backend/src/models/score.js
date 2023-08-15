const mongoose = require("mongoose");

const scoreSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  comicId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  rate: {
    type: Number,
    required: true,
  }
});

module.exports = mongoose.model("Score", scoreSchema);
