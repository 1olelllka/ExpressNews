const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const GoogleUserModel = new Schema({
  googleId: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  email: {
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
    type: String,
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

const GoogleUser = mongoose.model("GoogleUser", GoogleUserModel);
module.exports = GoogleUser;
