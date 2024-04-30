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
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Story",
      },
    ],
    required: false,
  },
  subscribed: {
    type: Array,
    required: false,
  },
});

const GoogleUser = mongoose.model("GoogleUser", GoogleUserModel);
module.exports = GoogleUser;
