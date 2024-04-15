const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://1olelllka:KYQ8D5HmNZlHFalL@expressnews.qvfs38w.mongodb.net/ExpressNews?retryWrites=true&w=majority"
  )
  .then(() => console.log("Connected to DB"))
  .catch((err) => console.log(err));

module.exports = mongoose;
