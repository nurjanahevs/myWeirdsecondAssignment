const express = require("express");
const router = express.Router();
const authentication = require("../middlewares/authJwt");
const userRouter = require("./user.routes");
const townHall = require("./townHall.routes");
const marketRouter = require("./market.routes");
const farmRouter = require("./farm.routes");
const barrackRouter = require("./barrack.routes");
const attackRouter = require("./attack.routes");

const errorHandler = require("../middlewares/errorHandler");

router.use("/user", userRouter);
router.use(authentication.authentication);
router.use("/townhall", townHall);
router.use("/market", marketRouter);
router.use("/farm", farmRouter);
router.use("/barrack", barrackRouter);
router.use("/attack", attackRouter);
router.use(errorHandler);

module.exports = router;
