const { Schema } = require("mongoose");
const mongoose = require("mongoose");

const Model = new Schema({
  username: {
    type: String,
    required: true,
  },
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

const User = mongoose.model("User", Model);
module.exports = User;
