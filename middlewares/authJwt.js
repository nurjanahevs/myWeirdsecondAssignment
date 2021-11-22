const jwt = require("jsonwebtoken");
const User = require("../models/User");

class authJwt {
  static authentication(req, res, next) {
    const { access_token } = req.headers;
    if (!access_token) {
      throw { name: "Missing_Token" };
    }
    jwt.verify(access_token, "clash_of_villages", (err, decoded) => {
      if (err) {
        throw { name: "INVALID_TOKEN" };
      }
      req.userData = decoded;
      next();
    });
  }

  static async specificUser(req, res, next) {
    const { id } = req.params;
    try {
      const result = await User.findById(req.userData.id, id);
      console.log(result);
      if (result.id === id) {
        next();
      } else {
        throw { name: "UNAUTHORIZED_TOKEN" };
      }
    } catch (err) {
      next(err);
    }
  }
}

module.exports = authJwt;
