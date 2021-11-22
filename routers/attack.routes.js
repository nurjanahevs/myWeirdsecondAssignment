const express = require("express");
const attackRouter = express.Router();
const attackController = require("../controllers/attackController");

attackRouter.post('/:id', attackController.attack);

module.exports = attackRouter;
