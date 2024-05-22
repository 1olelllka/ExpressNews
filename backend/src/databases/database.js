const mongoose = require("mongoose");
const { httpLogger } = require("../logs/winston");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL);
    console.log("\x1b[41m%s\x1b[0m", "Database ----> Connected to DB <----");
  } catch (err) {
    httpLogger.alert("Error connecting to DB", err);
  }
};

module.exports = connectDB;
