const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const barrackSchema = new Schema({
  _userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  barrackName: { type: String, required: true },
  lastCollected: {
    type: Number,
    default: Date.now(),
  },
});

const Barrack = mongoose.model("Barrack", barrackSchema);
module.exports = Barrack;