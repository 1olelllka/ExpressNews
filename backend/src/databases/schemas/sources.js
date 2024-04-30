const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const SourceModel = new Schema({
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
});

const Sources = mongoose.model("Sources", SourceModel);
module.exports = Sources;
