const mongoose = require("mongoose");
const { Schema } = mongoose;
const CategoryModel = require("./Category");

const Model = new Schema({
  header: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: false,
  },
  source: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  subcategory: {
    type: String,
    required: false,
  },
});

const Story = mongoose.model("Story", Model);
module.exports = Story;
