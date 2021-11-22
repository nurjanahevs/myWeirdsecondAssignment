const Market = require("../models/Market");
const User = require("../models/User");

class marketController {
  //create market by user
  static create(req, res, next) {
    User.findById({
      _id: req.userData.id,
    })
      .then((user) => {
        console.log(user);
        if (user) {
          if (user.resources.golds >= 30 && user.resources.foods >= 10) {
            const resources = user.resources;
            resources.golds -= 30;
            resources.foods -= 10;
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
        const { marketName } = req.body;
        const market = new Market({
          _userId: req.userData.id,
          marketName,
        });
        return market.save();
      })
      .then((market) => {
        res.status(200).json({
          success: true,
          data: market,
        });
      })
      .catch(next);
  }
  // static async create(req, res, next) {
  //   const { _id } = req.userData.id;
  //   const { marketName } = req.body;
  //   try { 
  //   const user = await User.findById(_id);
  //   // const resources = user.resources

  //   const { golds, foods } = user.resources;
  //   if (user.resources.golds >= 30 && user.resources.foods >= 10) {
  //     const neWresources = await User.findByIdAndUpdate(
  //       _userId, { $inc: { 'resources.golds': golds -30, 'resources.foods': foods -10 }, $push:{ Market: updateResources}}, 
  //       { new: true });
  //     const market = await Market.create({ marketName });
  //     res.status(200).send({ success: true, market: market, resources: neWresources });
  //   } else if (resources.golds < 30 || resources.foods < 10) next({ message: "NEED_RESOURCES" });
  //   else next({ message: "FAILED" });
  //   } catch (err) {
  //     next(err);
  //   }
  // }

  // view list user's markets by user
  static listMarket(req, res, next) {
    Market.find({
      _userId: req.userData.id,
    })
      .then((markets) => {
        res.status(200).json({
          success: true,
          data: markets,
        });
      })
      .catch(next);
  }
  // static async listMarket(req, res, next) {
  //   try {
  //     const market = await Market.find({ _userId: req.userData.id });
  //     res.status(200).json({ success: true, data: market });
  //   } catch (err) {
  //     next(err);
  //   }
  // }
  //view specific user's market by user
  static viewSpecificMarket(req, res, next) {
    const { id } = req.userData.id;
    Market.findById(id)
      .then((market) => {
        if (market) {
          const golds = Math.floor((Date.now() - market.lastCollected) / 60000);
          res.status(200).json({
            success: true,
            data: market,
            golds: golds > 20 ? 20 : golds,
          });
        } else {
          throw "NOT_FOUND";
        }
      })
      .catch(next);
  }
  //update user's market by user
  static marketUpdate(req, res, next) {
    const { marketName } = req.body;
    Market.findOne({
      _id: req.params.id,
    })
      .then((market) => {
        if (market) {
          market.marketName = marketName;
          return market.save();
        } else {
          throw "NOT_FOUND";
        }
      })
      .then((market) => {
        res.status(200).json({
          succes: true,
          data: market,
        });
      })
      .catch(next);
  }
  // static async marketUpdate(req, res, next) {
  //   const { marketName } = req.body;
  //   const id = req.params.id;
  //   try {
  //     const market = await Market.findByIdAndUpdate(id, { marketName }, { new: true });
  //     res.status(200).json({ success: true, data: market });
  //   } catch (error) {
  //     next(error);
  //   }
  // }
  //delete user's market by user
  static delete(req, res, next) {
    Market.findById({
      _id: req.params.id,
    })
      .then((market) => {
        return market.remove();
      })
      .then((market) => {
        res.status(200).json({
          success: true,
          message: "Market Deleted",
          data: market,
        });
      })
      .catch(next);
  }
  // static async delete(req, res, next) {
  //   const { id } = req.params;
  //   try {
  //     const market = await Market.findByIdAndDelete(id);
  //     res.status(200).json({ success: true, data: market });
  //   } catch (error) {
  //     next(error);
  //   }
  // }
  //automatically golds added to the market/minutes
  static goldAdd(req, res, next) {
    const id = req.params;
    Market.findById(id)
      .then((market) => {
        if (market) {
          const golds = Math.floor((Date.now() - market.lastCollected) / 60000);
          res.status(200).json({
            success: true,
            data: market,
            golds: golds > 20 ? 20 : golds,
          });
        } else {
          throw "NOT_FOUND";
        }
      })
      .catch(next);
  }
  //collective golds
  static collect(req, res, next) {
    const id = req.params;
    let golds;
    Market.findById(id)
      .then((market) => {
        if (market) {
          golds = Math.floor((Date.now() - market.lastCollected) / 60000);
          golds = golds > 20 ? 20 : golds;
          market.lastCollected = Date.now();
          return market.save();
        } else {
          throw "NOT_FOUND";
        }
      })
      .then((market) => {
        return User.findById(req._id);
      })
      .then((user) => {
        const resources = user.resources();
        resources.golds += golds;
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
          message: `${golds} golds has been added to your resouces `,
          data: result,
        });
      })
      .catch(next);
  }
}

module.exports = marketController;
