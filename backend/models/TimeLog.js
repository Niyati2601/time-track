const mongoose = require("mongoose");

const timeLogSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    position: {
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
   
  },
  { timestamps: true }
);

const timeLogModal = mongoose.model("TimeLog", timeLogSchema);
module.exports = timeLogModal;
