const mongoose = require("mongoose");
const { Schema } = require("mongoose");
const Category = require("./Category");

const SourceModel = new Schema({
  id: {
    type: String,
    required: false,
  },
  name: {
    type: String,
    required: false,
  },
  url: {
    type: String,
    required: false,
  },
  category: {
    type: String,
    required: false,
  },
  language: {
    type: String,
    required: false,
  },
  country: {
    type: String,
    required: false,
  },
});

const Sources = mongoose.model("Sources", SourceModel);
module.exports = Sources;
