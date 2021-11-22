const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const farmSchema = new Schema({
  _userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  farmName: { type: String, required: true },
  lastCollected: {
    type: Number,
    default: Date.now(),
  },
});

const Farm = mongoose.model("Farm", farmSchema);
module.exports = Farm;
