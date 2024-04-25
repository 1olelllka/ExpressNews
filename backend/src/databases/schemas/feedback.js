const mongoose = require("mongoose");
const { Schema } = mongoose;

const FeedbackModel = new Schema({
  description: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now(),
  },
  notify: {
    type: Boolean,
    default: false,
  },
});

const Feedback = mongoose.model("Feedback", FeedbackModel);
module.exports = Feedback;
