const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const CategoryModel = new Schema({
  name: {
    type: String,
    required: true,
  },
});

const Category = mongoose.model("Category", CategoryModel);
module.exports = Category;
