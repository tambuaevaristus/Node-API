const express = require('express');
const messageController = require("./../controller/messageController");
const router = express.Router();

router.post("/send-message", messageController.sendMessage);


module.exports = router;
