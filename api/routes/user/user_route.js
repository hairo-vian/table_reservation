const express = require('express');
const controller = require("../user/user_controller");
const router = express.Router();

router.post('/login', controller.userPostLogin);

router.post('/register', controller.userPostSignUp);

module.exports = router;