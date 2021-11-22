const Farm = require('../models/Farm')

module.exports = (req, res, next) => {
  Farm.findOne({
      _id: req.params._id
    })
    .then((farm) => {
      if (farm) {
        if (farm._userId.toString() === req._id) {
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