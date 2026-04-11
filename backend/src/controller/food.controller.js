const foodModel = require("../models/food.model");
const { uploadVideo } = require("../services/storage.service")
const { v4: uuid } = require("uuid")


async function createFood(req,res){
    try{
        console.log("BELOW")
        // console.log(req.foodPartner);

        console.log("req.file → ", req.file);        // add this
        console.log("req.body → ", req.body); 

        if (!req.file) {
            return res.status(400).json({
            error: "File is required",
        });
}
        const fileUploadResult = await uploadVideo(
            req.file.buffer,
            uuid()
        )

        console.log("upload result → ", fileUploadResult);

        const foodUploaded = await foodModel.create({
            name : req.body.name,
            video : fileUploadResult.url,
            description : req.body.description,
            foodPartner : req.foodPartner._id
        })

        res.status(201).json({
            msg : "Food Created Successfully",
            food : foodUploaded
        })
    }catch(error){
        res.status(500).json({
            error : error.message
        })
    }
}

async function getFood(req,res){

    const foodItems = await foodModel.find({})

    res.status(200).json({
        msg : "food items fetched successfully",
        foodItems
    })

}

module.exports = {
    createFood,
    getFood,
}