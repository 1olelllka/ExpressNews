const mongoose = require("mongoose");
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL);
    console.log("\x1b[41m%s\x1b[0m", "Database ----> Connected to DB <----");
  } catch (err) {
    console.log("Error connecting to DB", err);
  }
};

module.exports = connectDB;
