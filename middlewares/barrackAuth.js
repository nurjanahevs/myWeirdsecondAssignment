const Barrack = require('../models/Barrack')

module.exports = (req, res, next) => {
  Barrack.findOne({
      _id: req.params._id
    })
    .then((barrack) => {
      if (barrack) {
        if (barrack._userId.toString() === req._id) {
          next();
        } else {
          throw 'FORBIDDEN';
        }
      } else {
        throw 'NOT_FOUND';
      }
    })
    .catch(next);
};