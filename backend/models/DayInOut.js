const mongoose = require("mongoose");

const dayInOutSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    dayIn: {
        type: Date,
        required: true,
    },
    dayOut: {
        type: Date,
    },
    duration: {
        type: String,
    },
});

const DayInOut = mongoose.model("DayInOut", dayInOutSchema);

module.exports = DayInOut;