const Barrack = require("../models/Barrack");
const User = require("../models/User");

class barrackController {
  //create barrack by user
  static create(req, res, next) {
    User.findById({
      _id: req.userData.id,
    })
      .then((user) => {
        console.log(user);
        if (user) {
          if (user.resources.golds >= 30 && user.resources.foods >= 30) {
            const resources = user.resources;
            resources.golds -= 30;
            resources.foods -= 30;
            return User.updateOne(
              {
                _id: req.userData.id,
              },
              {
                resources: resources,
              }
            );
          } else {
            throw "NOT_ENOUGH";
          }
        } else {
          throw "NOT_FOUND";
        }
      })
      .then((_) => {
        const { barrackName } = req.body;
        const barrack = new Barrack({
          _userId: req.userData.id,
          barrackName,
        });
        return barrack.save();
      })
      .then((barrack) => {
        res.status(200).json({
          success: true,
          data: barrack,
        });
      })
      .catch(next);
  }
//view list user's barracks by user
  static listBarrack(req, res, next) {
    Barrack.find({
      _userId: req.userData.id,
    })
      .then((barrack) => {
        res.status(200).json({
          success: true,
          data: barrack,
        });
      })
      .catch(next);
  }
//view specific user's barrack by user
  static viewSpecificBarrack(req, res, next) {
    const { id } = req.params;
    Barrack.findById(id)
      .then((barrack) => {
        if (barrack) {
          const soldiers = Math.floor((Date.now() - barrack.lastCollected) / 60000);
          res.status(200).json({
            success: true,
            data: barrack,
            soldiers: soldiers > 10 ? 10 : soldiers,
          });
        } else {
          throw "NOT_FOUND";
        }
      })
      .catch(next);
  }
//update user's barrack by user
  static updateBarrack(req, res, next) {
    const { barrackName } = req.body;
    Barrack.findOne({
      _id: req.params.id,
    })
      .then((barrack) => {
        if (barrack) {
          barrack.barrackName = barrackName;
          return barrack.save();
        } else {
          throw "NOT_FOUND";
        }
      })
      .then((barrack) => {
        res.status(200).json({
          succes: true,
          data: barrack,
        });
      })
      .catch(next);
  }
//delete user's barrack by user
  static delete(req, res, next) {
    Barrack.findById({
      _id: req.params.id,
    })
      .then((barrack) => {
        return barrack.remove();
      })
      .then((barrack) => {
        res.status(200).json({
          success: true,
          message: "Barrack has been Deleted",
          data: barrack,
        });
      })
      .catch(next);
  }
//automatically soldiers added to the market/minutes 
  static soldierAdd(req, res, next) {
    const id = req.params;
    Barrack.findById(id)
      .then((barrack) => {
        if (barrack) {
          const soldiers = Math.floor((Date.now() - barrack.lastCollected) / 60000);
          res.status(200).json({
            success: true,
            data: barrack,
            soldiers: soldiers > 20 ? 20 : soldiers,
          });
        } else {
          throw "NOT_FOUND";
        }
      })
      .catch(next);
  }
//collective barracks
  static collect(req, res, next) {
    let soldiers;
    Barrack.findById(req.params.id)
      .then((barrack) => {
        if (barrack) {
          soldiers = Math.floor((Date.now() - barrack.lastCollected) / 60000);
          soldiers = soldiers > 10 ? 10 : soldiers;
          barrack.lastCollected = Date.now();
          return barrack.save();
        } else {
          throw "NOT_FOUND";
        }
      })
      .then((barrack) => {
        return User.findById(req._userId);
      })
      .then((user) => {
        const resources = user.resources();
        resources.soldiers += soldiers;
        return User.updateOne(
          {
            _id: req._userId,
          },
          {
            resources: resources,
          }
        );
      })
      .then((result) => {
        res.status(200).json({
          success: true,
          message: `${soldiers} soldiers has been added to your resouces `,
          data: result,
        });
      })
      .catch(next);
  }
}

module.exports = barrackController;
