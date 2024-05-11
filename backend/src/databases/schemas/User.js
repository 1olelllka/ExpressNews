const { Schema } = require("mongoose");
const mongoose = require("mongoose");

const Model = new Schema({
  username: {
    type: String,
    required: true,
  },
  discordId: {
    type: String,
    required: false,
  },
  googleId: {
    type: String,
    require: false,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: false,
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
  preferred_topics: {
    type: Array,
    required: false,
  },
});

Model.on("save", (doc) => {
  if (!doc.discordId && !doc.googleId && !doc.password) {
    throw new Error("User should have password");
  }
});

const User = mongoose.model("User", Model);
module.exports = User;
