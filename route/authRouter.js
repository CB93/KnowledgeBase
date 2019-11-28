const express = require('express');
const router = express.Router();
const authController = require("../controller/authController");
const postController = require("../controller/postController");
const messageController = require("../controller/messageController");

// Login routes
router.get("/", authController.index);
router.post("/login", authController.login);

// Register routes
router.post("/register", authController.register);
router.get("/about", authController.about)

// Posting routes
router.post("/post", postController.post);

router.post("/message", messageController.sendMessage);
module.exports = router;
