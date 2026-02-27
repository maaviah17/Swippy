const userModel = require("../models/user.model")
const bcrypt = require("bcrypt")

async function registerUser(req,res){
    const {fullname,email,password} = req.body;

    const userExistAlready = await userModel.findOne();
    if(userExistAlready){
        return res.status(400).send({
            msg : "User Already Exists !!"
        })
    }

    if((!fullname) || (!password) || (!email)){
        return res.status(400).send({
            msg : "Fill in Creds"
        })
    }

    const hashedPassword = await bcrypt.hash(password,10);

    const user = await userModel.create({
        fullname : fullname,
        email : email,
        password : hashedPassword,
    })
    res.status(201).send({
        msg : "registered successfullt",
        user : fullname,
        email : email,
    })
}

module.exports={
    registerUser
}

