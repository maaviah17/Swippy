const express = require("express");
const app = express();
const userModel = require("./models/user.model")

app.use(express.json());

app.post("/reg", async (req,res)=>{
    
    const {username,email,password} = req.body;

    if((!username) || (!password) || (!email)){
        return res.status(400).send({
            msg : "Fill in Creds"
        })
    }

    const user = await userModel.create({
        username : username,
        email : email,
        password : password,
    })

    res.status(201).send({
        msg : "registered successfullt",
        user : username,
        email : email,
    })

})

module.exports = app;