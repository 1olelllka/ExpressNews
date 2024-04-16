const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://1olelllka:KYQ8D5HmNZlHFalL@expressnews.qvfs38w.mongodb.net/ExpressNews?retryWrites=true&w=majority"
    );
    console.log("Connected to DB");
  } catch (err) {
    console.log("Error connecting to DB", err);
  }
};

module.exports = connectDB;
