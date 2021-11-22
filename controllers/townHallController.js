const User = require('../models/User');

class townHallController {
  static get(req, res, next) {
    User.findOne(req.userData.id)
      .then((user) => {
        console.log(user)
        if(user) {
          console.log(user, 'found');
          res.status(200).json({ success: true, data: user.resources });
        } else {
          throw 'USER_NOT_FOUND';
        }
      })
      .catch(next);
  }
}

module.exports = townHallController;