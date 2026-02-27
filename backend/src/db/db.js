const mongoose = require("mongoose")

async function connectDB() {
    try{
        await mongoose.connect("mongodb+srv://mmk:2PbqKy87LxGyIRzr@complete-backend.vr71s5q.mongodb.net/reelomato")  
        console.log("connected to DB :) ")       
    }catch(err){
        console.error("ERROR WHILE CONNECTED DB : ", err)
    }
}

module.exports = connectDB;
