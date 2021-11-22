const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

class userController {
  //user register
  static async register(req, res, next) {
    const { username, email, password } = req.body;
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);
    try {
      const result = await User.create({
        username: username,
        email: email,
        password: hashedPassword,
      });
      res.status(201).json({ message: "Data User Created", data: result });
    } catch (err) {
      next(err);
    }
  }
  //view all users
  static async viewUsers(req, res, next) {
    try {
      const result = await User.find().select("-__v");
      if (result.length === 0) {
        throw { name: "NOT_FOUND_ALL" };
      } else {
        res.status(200).json({ message: "Show the Data Users", data: result });
      }
    } catch (err) {
      next(err);
    }
  }
  //view specific user by user
  static async viewSpecificUser(req, res, next) {
    const { id } = req.params;
    try {
      const result = await User.findById(id);
      if (result === null) {
        throw { name: "NOT_FOUND_SPECIFIC" };
      } else {
        res.status(200).json({
          message: "User ",
          data: result,
        });
      }
    } catch (err) {
      next(err);
    }
  }
//update the data user by user
  static async updateUser(req, res, next) {
    const { id } = req.params;
    const { email, username } = req.body;
    try {
      const result = await User.findByIdAndUpdate(id, { email, username }, { new: true });
      res.status(200).json({ message: "User has been updated", data: result });
    } catch (err) {
      next(err);
    }
  }
//delete the data user by user
  static async deleteUser(req, res, next) {
    const { id } = req.params;
    try {
      const result = await User.findByIdAndDelete(id);
      res.status(202).json({ message: "User has been deleted", data: result });
    } catch (err) {
      next(err);
    }
  }
//user login
  static async login(req, res, next) {
    const { email, password } = req.body;
    try {
      const result = await User.findOne({ email });
      if (!result) {
        throw { name: "UNAUTHORIZED" };
      }
      const passwordIsValid = bcrypt.compareSync(password, result.password);
      if (!passwordIsValid) {
        throw { name: "UNAUTHORIZED" };
      }
      const token = jwt.sign({ id: result.id, username: result.username, email: result.email }, "clash_of_villages", {
        expiresIn: "1h",
      });
      res.status(200).json({ message: " Login Success", data: result, AccessToken: token });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = userController;
