const express = require("express");
const app = express();
const userModel = require("./models/user.model")

app.use(express.json());

app.post("/api", async (req,res)=>{
})

module.exports = app;