const express = require('express');
const router = express.Router();
const loginController = require("../controller/loginController")

// Login routes
router.get("/", loginController.index)
router.post("/login", loginController.login)

module.exports = router;