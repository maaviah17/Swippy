const userModel = require("../models/user.model")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");

async function registerUser(req,res){
try{
    const {fullname,email,password} = req.body;

    if(!fullname || !password || !email){
        return res.status(400).send({
            msg : "Fill in Creds"
        })
    }

    const userExistAlready = await userModel.findOne({ email });

    if(userExistAlready){
        return res.status(400).send({
            msg : "User Already Exists !!"
        })
    }

    const hashedPassword = await bcrypt.hash(password,10);

    const user = await userModel.create({
        fullname : fullname,
        email : email,
        password : hashedPassword,
    })

    const token = jwt.sign(
        { id : user._id },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
    )

    res.cookie("token", token)

    res.status(201).send({
        msg : "registered successfullt",
        user : {
            _id : user._id,
            fullname : user.fullname,
            email : user.email,
        },
        
    })
}catch(err){
    console.error("ERROR : ", err);
}
}

async function loginUser(req,res){

    try{

        const {email,password} = req.body;

        const user = await userModel.findOne({ email })
        if(!user){
            return res.status(400).json({
                msg : "Invalid Creds"
            })
        }

        const isPasswordValid = await bcrypt.compare(password, user.password)
        if(!isPasswordValid){
            return res.status(400).json({
                msg : "Invalid Creds ;( "
            })
        }

        const token = jwt.sign(
            { _id : user._id },
            process.env.JWT_SECRET
        )

        res.cookie("token", token);

        res.status(200).json({
            msg : "User Logged in successfully",
            user : {
                _id : user._id,
                fullname : user.fullname,
                email : user.email,
            },
        })

    }catch(err){
        console.error("ERROR : ")
    }

}

module.exports={
    registerUser,
    loginUser
}


