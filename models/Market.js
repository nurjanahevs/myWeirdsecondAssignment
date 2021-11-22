const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const marketSchema = new Schema({
  _userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  marketName: { type: String, required: true },
  lastCollected: {
    type: Number,
    default: Date.now(),
  },
});

const Market = mongoose.model("Market", marketSchema);

module.exports = Market;
