const mongoose = require("mongoose");
const { httpLogger } = require("../logs/winston");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL);
  } catch (err) {
    httpLogger.alert("Error connecting to DB", err);
  }
};

module.exports = connectDB;
