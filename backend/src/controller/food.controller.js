const foodModel = require("../models/food.model");

async function createFood(req,res){

    console.log(req.foodPartner);
    con
    res.status(201).json({
        msg : "HI there"
    })

}

module.exports = {
    createFood,
}