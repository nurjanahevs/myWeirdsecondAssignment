const express = require("express");
const farmRouter = express.Router();
const farmController = require("../controllers/farmController");
const farmAuth = require("../middlewares/farmAuth");

farmRouter.post("/", farmController.create);
farmRouter.get("/", farmController.listFarm);
farmRouter.get("/:id", farmAuth, farmController.viewSpecificFarm);
farmRouter.get("/:id", farmAuth, farmController.foodAdd);
farmRouter.put("/:id", farmAuth, farmController.updateFarm);
farmRouter.delete("/:id", farmAuth, farmController.delete);
farmRouter.get("/:id/collect", farmAuth, farmController.collect);

module.exports = farmRouter;