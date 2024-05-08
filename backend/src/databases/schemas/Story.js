const mongoose = require("mongoose");
const { Schema } = mongoose;

const Model = new Schema({
  source: {
    type: Object,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  url: {
    type: String,
    required: true,
  },
  urlToImage: {
    type: String,
    required: true,
  },
  publishedAt: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: false,
  },
  category: {
    type: String,
    required: false,
  },
});

const Story = mongoose.model("Story", Model);
module.exports = Story;
