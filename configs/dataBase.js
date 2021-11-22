const mongoose = require("mongoose");
const cron = require("node-cron");
const Market = require("../models/Market");
const Farm = require("../models/Farm");
const Barr = require("../models/Barrack");

const connectDB = () => {
  main().catch((err) => console.log(err));

  async function main() {
    try {
      const dbName = "Clash_of_Villages_Eva";
      await mongoose.connect(`mongodb://localhost:27017/${dbName}`);
      console.log("DB_CONNECTED");

      const job = new cron.schedule(
        "1 * * * * *",
        async () => {
          console.log("Running task every minute");
          const market = await Market.findByIdAndUpdate(id, { marketName }, { new: true });
          await marketSchema.updateOne({ "market.lastCollected": { $lt: 20 } }, { $inc: { "market.lastCollected": 1 } });
          await farmSchema.updateOne({ "farm.lastCollected": { $lt: 20 } }, { $inc: { "farm.lastCollected": 1 } });
          await barrackSchema.updateOne({ "market.lastCollected": { $lt: 10 } }, { $inc: { "market.lastCollected": 1 } });
        },
        null,
        true,
        "Adds"
      );
      job.start();
    } catch (err) {
      console.log(err);
    }
  }
};

module.exports = connectDB;
