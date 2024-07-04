const mongoose = require("mongoose");

const timeLogSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    projects: {
      type: String,
      required: true,
    },
    
    startTIme: {
      type: Date,
      default: Date.now,     
      required: true,
    },
    endTIme: {
      type: Date,
      default: null,
    },
    title: {
      type: String,
      required: true,
    },
    tags: {
      type: [{}],
      default: [],
      required: true,
    },
    duration: {
      type: String,
    },  
  },
  { timestamps: true }
);

const timeLogModal = mongoose.model("TimeLog", timeLogSchema);
module.exports = timeLogModal;
