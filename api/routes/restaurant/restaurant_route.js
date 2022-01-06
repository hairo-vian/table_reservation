const express = require('express');
const controller = require("../restaurant/restaurant_controller");
const checkAuth = require('../../middlewares/CheckAuth');
const router = express.Router();

router.get("/listResaurants", checkAuth, controller.restaurantGetList)

router.post("/insertNewRestaurant", checkAuth, controller.restaurantInsertNew)

router.post("/updatePassword", checkAuth, controller.restaurantUpdatePassword)

router.post("/login", controller.restaurantLogin)

router.delete("/delete/:restaurantId", checkAuth, controller.restaurantDelete)

router.post("/updateData", checkAuth, controller.restaurantUpdateData)

module.exports = router;