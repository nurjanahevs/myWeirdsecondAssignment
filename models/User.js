const mongoose = require("mongoose");
const { Schema } = mongoose;
// const bcrypt = require("bcrypt");

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    min: [6, "Too few pass"],
    max: 12,
    required: true,
  },
  resources: {
    golds: { type: Number, default: 100, max: 1000 },
    foods: { type: Number, default: 100, max: 1000 },
    soldiers: { type: Number, default: 0, max: 500 },
  },
});

const User = mongoose.model("User", userSchema);
module.exports = User;
