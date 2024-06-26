const mongoose = require('mongoose');

const Connection = async() => {
    try {
        const conn=await mongoose.connect("mongodb+srv://namratac:Namrata@cluster0.nte2w9a.mongodb.net/timeTrack");
        console.log("MongoDb is connected");
    } catch (error) {
        console.log("Connection error", error);
    }
}

module.exports = Connection