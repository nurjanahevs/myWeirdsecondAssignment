const express = require("express");
const marketRouter = express.Router();
const marketController = require("../controllers/marketController");
const marketAuth = require("../middlewares/marketAuth");

marketRouter.post("/", marketController.create);
marketRouter.get("/", marketController.listMarket);
marketRouter.get("/:id", marketAuth, marketController.viewSpecificMarket);
marketRouter.get("/gold/:id", marketAuth, marketController.goldAdd);
marketRouter.put("/:id", marketAuth, marketController.marketUpdate);
marketRouter.delete("/:id", marketAuth, marketController.delete);
marketRouter.get("/:id/collect", marketAuth, marketController.collect);

module.exports = marketRouter;
