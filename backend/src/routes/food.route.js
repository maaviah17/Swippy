const express = require("express");
const router = express.Router();
const foodController = require("../controller/food.controller");
const {authFoodPartnerMiddleware, authUserMiddleware} = require("../middlewares/auth.middleware");
const multer = require("multer")
const storage = multer.memoryStorage();
const upload = multer({ storage });

// [protected route] -> only the foodpartner can add fooditem
router.post("/", upload.single("video") ,authFoodPartnerMiddleware, foodController.createFood);
router.get("/", authUserMiddleware , foodController.getFood);
module.exports = router

