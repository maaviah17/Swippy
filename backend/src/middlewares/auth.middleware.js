const foodPartnerModel = require("../models/foodpartner.model");
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
        
        const foodPartner = await foodPartnerModel.findById(decoded._id)

        req.foodPartner = foodPartner
        next();

    }catch(err){
        console.error("ERROR : ", err);
        return res.status(401).json({
            msg : "Invalid token"
        })
    }
}

module.exports = {
    authFoodPartnerMiddleware,
}