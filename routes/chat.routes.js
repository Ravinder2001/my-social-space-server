const express = require("express");
const validateBody = require("../helpers/validateBodyHelper");
const schemas = require("../validations/chat/payloadValidation");
const chatController = require("../controller/chat.controller");
// const { validatePostId, validatePostOwnership } = require("../middleware/postValidation");
const router = express.Router();

// Friends
router.get("/friends", chatController.getFriendsList);

// Channels
router.post("/channels", validateBody(schemas.createChannel), chatController.createChannel);
router.post("/channels/participants", validateBody(schemas.addParticipantsToChannel), chatController.addParticipantsToChannel);
router.get("/channels", chatController.getUserChannels);

// Messages
router.post("/messages", validateBody(schemas.sendMessage), chatController.sendMessage);
router.get("/messages/:channel_id", chatController.getMessages);

// Seen
router.post("/seen", validateBody(schemas.markAsSeen), chatController.markAsSeen);

module.exports = router;
