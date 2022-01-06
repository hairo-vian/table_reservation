const express = require('express');
const controller = require("../reservation/reservation_controller");
const checkAuth = require('../../middlewares/CheckAuth');
const router = express.Router();

router.post("/insertNewReservation", checkAuth, controller.insertNewReservation)

router.post("/updateCancelReservation", checkAuth, controller.updateCancelReservation)

module.exports = router;