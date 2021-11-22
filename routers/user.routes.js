const express = require("express");
const userRouter = express.Router();
const userController = require("../controllers/userController");
const auth = require("../middlewares/authJwt");

userRouter.post("/register", userController.register);
userRouter.post("/login", userController.login);

userRouter.use(auth.authentication);

userRouter.get("/", userController.viewUsers);

userRouter.get("/:id", auth.specificUser, userController.viewSpecificUser);
userRouter.put("/:id", auth.specificUser, userController.updateUser);
userRouter.delete("/:id", auth.specificUser, userController.deleteUser);

module.exports = userRouter;
