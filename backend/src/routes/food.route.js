const express = require("express");
const router = express.Router();
const foodController = require("../controller/food.controller");
const {authFoodPartnerMiddleware} = require("../middlewares/auth.middleware");

// [protected route] -> only the foodpartner can add fooditem
router.post("/", authFoodPartnerMiddleware, foodController.createFood);

module.exports = router

