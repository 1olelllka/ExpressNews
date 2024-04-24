const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const DiscordUserModel = new Schema({
  discordId: {
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
  saved_searches: {
    type: Array,
    required: false,
  },
  subscribed: {
    type: Array,
    required: false,
  },
});

const DiscordUser = mongoose.model("DiscordUser", DiscordUserModel);
module.exports = DiscordUser;
