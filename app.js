const express = require("express");

const connectDB = require("./configs/dataBase");
const router = require("./routers/routes");
const errorHandler = require("./middlewares/errorHandler");

const app = express();
const port = 3000;

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/home", (req, res) => {
  res.send("Welcome to The Game");
});

// app.use(router);

app.use("/game", router);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
