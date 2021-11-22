const Farm = require("../models/Farm");
const User = require("../models/User");

class farmController {
  //create farm by user
  static create(req, res, next) {
    User.findById({
      _id: req.userData.id,
    })
      .then((user) => {
        console.log(user);
        if (user) {
          if (user.resources.golds >= 10 && user.resources.foods >= 30) {
            const resources = user.resources;
            resources.golds -= 10;
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
        const { farmName } = req.body;
        const farm = new Farm({
          _userId: req.userData.id,
          farmName,
        });
        return farm.save();
      })
      .then((farm) => {
        res.status(200).json({
          success: true,
          data: farm,
        });
      })
      .catch(next);
  }
//view list user's farms by user
  static listFarm(req, res, next) {
    Farm.find({
      _userId: req.userData.id,
    })
      .then((farms) => {
        res.status(200).json({
          success: true,
          data: farms,
        });
      })
      .catch(next);
  }
//view specific user's farm by user
  static viewSpecificFarm(req, res, next) {
    const { id } = req.params;
    Farm.findById(id)
      .then((farm) => {
        if (farm) {
          const foods = Math.floor((Date.now() - farm.lastCollected) / 60000);
          res.status(200).json({
            success: true,
            data: farm,
            foods: foods > 20 ? 20 : foods,
          });
        } else {
          throw "NOT_FOUND";
        }
      })
      .catch(next);
  }
//update user's farm by user
  static updateFarm(req, res, next) {
    const { farmName } = req.body;
    Farm.findOne({
      _id: req.params.id,
    })
      .then((farm) => {
        if (farm) {
          farm.farmName = farmName;
          return farm.save();
        } else {
          throw "NOT_FOUND";
        }
      })
      .then((farm) => {
        res.status(200).json({
          succes: true,
          data: farm,
        });
      })
      .catch(next);
  }
//delete user's farm by user
  static delete(req, res, next) {
    Farm.findById({
      _id: req.params.id,
    })
      .then((farm) => {
        return farm.remove();
      })
      .then((farm) => {
        res.status(200).json({
          success: true,
          message: "Farm has been Deleted",
          data: farm,
        });
      })
      .catch(next);
  }
//automatically foods added to the market/minutes 
  static foodAdd(req, res, next) {
    const id = req.params;
    Farm.findById(id)
      .then((farm) => {
        if (farm) {
          const foods = Math.floor((Date.now() - farm.lastCollected) / 60000);
          res.status(200).json({
            success: true,
            data: farm,
            foods: foods > 20 ? 20 : foods,
          });
        } else {
          throw "NOT_FOUND";
        }
      })
      .catch(next);
  }
//collective foods
  static collect(req, res, next) {
    const id = req.params;
    let foods = 0;
    Farm.findById(id)
      .then((farm) => {
        if (farm) {
          foods = Math.floor((Date.now() - farm.lastCollected) / 60000);
          foods = foods > 20 ? 20 : foods;
          farm.lastCollected = Date.now();
          return farm.save();
        } else {
          throw "NOT_FOUND";
        }
      })
      .then((farm) => {
        return User.findById(req._id);
      })
      .then((user) => {
        const resources = user.resources();
        resources.foods += foods;
        return User.updateOne(
          {
            _id: req._id,
          },
          {
            resources: resources,
          }
        );
      })
      .then((result) => {
        res.status(200).json({
          success: true,
          message: `${foods} foods has been added to your resouces `,
          data: result,
        });
      })
      .catch(next);
  }
}

module.exports = farmController;
