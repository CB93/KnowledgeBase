const express = require('express');
const router = express.Router();
const authorize = require("../public/js/authorization");
const appController = require("../controller/appController")

router.get("/landing", authorize, appController.landing)

router.post("/edit", authorize, appController.editProfile)
router.get("/messaging", authorize, appController.messaging);

module.exports = router;
