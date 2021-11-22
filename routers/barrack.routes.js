const express = require("express");
const barrackRouter = express.Router();
const barrackController = require("../controllers/barrackController");
const barrackAuth = require("../middlewares/barrackAuth");

barrackRouter.post("/", barrackController.create);
barrackRouter.get("/", barrackController.listBarrack);
barrackRouter.get("/:id", barrackAuth, barrackController.viewSpecificBarrack);
barrackRouter.get("/:id", barrackAuth, barrackController.soldierAdd);
barrackRouter.put("/:id", barrackAuth, barrackController.updateBarrack);
barrackRouter.delete("/:id", barrackAuth, barrackController.delete);
barrackRouter.get("/:id/collect", barrackAuth, barrackController.collect);

module.exports = barrackRouter;