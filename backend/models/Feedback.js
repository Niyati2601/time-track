// models/Feedback.js
const mongoose = require("mongoose");

const FeedbackSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  username:{
    type: String,
    ref: "User",
  },
  type: {
    type: String,
    enum: ["general", "personal"],
    required: true,
  },
  projectName: {
    type: String,
  },
  employee: {
    type: String,
    required: function () {
      return this.type === "personal";
    },
  },
  employeeId: {
    type: String,
    required: function () {
      return this.type === "personal";
    },
  },
  description: {
    type: String,
    required: true,
    maxlength: 1024,
  },
  isAnonymous: {
    type: Boolean,
    default: false,
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Feedback", FeedbackSchema);
