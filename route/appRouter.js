const express = require('express');
const router = express.Router();
const appController = require("../controller/appController")

router.get("/landing", appController.landing)

// router.get("/profile", appController.userProfile)

module.exports = router;