const foodPartnerModel = require("../models/foodpartner.model");
const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");

async function authFoodPartnerMiddleware(req,res,next){

    const token = req.cookies.token;
    if(!token){
        return res.status(401).json({
            msg : "Unauthorized Access !!"
        })
    }

    try{    

        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        
        const foodPartner = await foodPartnerModel.findById(decoded.id)

        req.foodPartner = foodPartner
        next();
        console.log(decoded);
        console.log(decoded._id);

    }catch(err){
        console.error("ERROR : ", err);
        return res.status(401).json({
            msg : "Invalid token"
        })
    }
}

async function authUserMiddleware(req,res,next){

    const token = req.cookies.token;
    if(!token){
        return res.status(401).json({
            msg : "Unauthorized access! Please login first."
        })
    }

    try{

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.findById(decoded._id)

        req.user = decoded
        next()

    }catch(error){
        return res.status(401).json({
            msg : "Invalid or expired token"
        })
    }

}

module.exports = {
    authFoodPartnerMiddleware,
    authUserMiddleware
}