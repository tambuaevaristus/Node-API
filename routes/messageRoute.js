const express = require('express');
const messageController = require("./../controller/messageController");
const router = express.Router();

router.post("/", messageController.sendMessage);


module.exports = router;
