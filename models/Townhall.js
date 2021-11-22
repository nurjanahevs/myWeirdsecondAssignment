const mongoose = require('mongoose');
const { Schema } = mongoose;

const townHall = mongoose.model('Townhall', Schema);
module.exports = townHall;