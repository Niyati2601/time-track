// models/Clocking.js
const mongoose = require("mongoose");

const ClockingSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    clockInTime: {
      type: Date,
      required: true,
    },
    clockOutTime: {
      type: Date,
    },
    duration: {
      type: String,
    },
  },
  { timestamps: true }
);

const Clocking = mongoose.model("Clocking", ClockingSchema);

module.exports = Clocking;
