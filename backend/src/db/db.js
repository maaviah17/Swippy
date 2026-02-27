const mongoose = require("mongoose")

async function connectDB() {
    await mongoose.connect("mongodb+srv://mmk:2PbqKy87LxGyIRzr@complete-backend.vr71s5q.mongodb.net/reelomato")  
    console.log("connected to DB :) ")  
}

module.exports = connectDB;
