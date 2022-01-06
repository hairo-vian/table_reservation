const express = require('express');
const controller = require("../meja/meja_controller");
const checkAuth = require('../../middlewares/CheckAuth');
const router = express.Router();

router.post("/listTables", checkAuth, controller.mejaGetList)

router.post("/insertNewTable", checkAuth, controller.mejaInsertNew)

router.post("/updateTableReservation", checkAuth, controller.updateReservedTable)

module.exports = router;