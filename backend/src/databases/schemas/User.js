const { Schema } = require("mongoose");
const mongoose = require("mongoose");

const Model = new Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  full_name: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now(),
  },
  image: {
    type: Buffer,
    required: false,
  },
  saved_stories: {
    type: Array,
    required: false,
  },
  saved_searches: {
    type: Array,
    required: false,
  },
  liked: {
    type: Array,
    required: false,
  },
  disliked: {
    type: Array,
    required: false,
  },
  subscribed: {
    type: Array,
    required: false,
  },
});

const User = mongoose.model("User", Model);
module.exports = User;
