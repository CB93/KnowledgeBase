const express = require('express');
const router = express.Router();
const authController = require("../controller/authController")

// Login routes
router.get("/", authController.index)
router.post("/login", authController.login)

// Register routes
router.post("/register",authController.register)

module.exports = router;