const express = require('express');
const router = express.Router();
const authController = require("../controller/authController");
const postController = require("../controller/postController");

// Login routes
router.get("/", authController.index);
router.post("/login", authController.login);

// Register routes
router.post("/register", authController.register);

// Posting routes
router.post("/post", postController.post);
module.exports = router;
