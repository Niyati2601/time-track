const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema(
    {
        adminName: {
            type: String,
            unique: true,
            required: true,
        },
        email: {
            type: String,
            unique: true,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        profilePhoto: {
            type: String,
        },
        role: {
            type: String,
            default: "admin",
        },
    },
    { timestamps: true }
);

const adminModal = mongoose.model("admin", adminSchema);
module.exports = adminModal