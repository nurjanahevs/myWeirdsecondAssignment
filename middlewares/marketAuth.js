const Market = require('../models/Market')

module.exports = (req, res, next) => {
  Market.findOne({
      _id: req.params._id
    })
    .then((market) => {
      if (market) {
        if (market._userId.toString() === req._id) {
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

// class marketAuth {
//   static async specificMarket(req, res, next) {
//     const { id } = req.params;
//     const { _userId } = req.body;
//     try {
//       const market = await Market.findById(req.userData.id);
//       console.log(market);
//       if (market._userId.toString() === req.id) {
//         next();
//       } else {
//         throw { name: 'FORBIDDEN '}
//       }
//     } catch (err) {
//       next(err);
//     }
//   }
// }

// module.exports = marketAuth;