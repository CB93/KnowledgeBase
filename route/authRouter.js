const express = require('express');
const router = express.Router();
const authorize = require("../public/js/authorization");
const authController = require("../controller/authController");
const postController = require("../controller/postController");
const messageController = require("../controller/messageController");


// Login routes
router.get("/", authController.index);
router.post("/login", authController.login);

// Register routes
router.post("/register", authController.register);
router.get("/about", authController.about);

// Posting routes
router.post("/post", authorize, postController.post);
router.get("/post/:pagination", authorize, postController.getPosts);//TODO --- replies
router.get("/post/:postId/replies", postController.getReplies);

//DM routes
router.post("/message", authorize, messageController.sendMessage);
router.get("/conversations", authorize, messageController.getConversations);
router.get("/message/:conversationId", authorize, messageController.getMessages);
module.exports = router;
