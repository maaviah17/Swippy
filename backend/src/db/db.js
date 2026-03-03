const mongoose = require("mongoose")

async function connectDB() {
    try{
        await mongoose.connect(process.env.DATABASE_URL)  
        console.log("connected to DB :) ")       
    }catch(err){
        console.error("ERROR WHILE CONNECTED DB : ", err)
    }
}

module.exports = connectDB;
