const express = require("express");
const validateBody = require("../helpers/validateBodyHelper");
const schemas = require("../validations/chat/payloadValidation");
const chatController = require("../controller/chat.controller");
const { validateMessageId, validateChannelId, validateChannelOwnership } = require("../middleware/chatValidation");
const router = express.Router();

// Friends
router.get("/searchFriends", chatController.getFriendsList);

// Channels
router.post("/channels", validateBody(schemas.createChannel), chatController.createChannelWithUsers);
router.post("/channels/participants/:channel_id", validateBody(schemas.addParticipantsToChannel), validateChannelOwnership, chatController.addParticipantsToChannel);
router.get("/channels", chatController.getUserChannels);
router.get("/channelDetails/:channel_id", validateChannelId, chatController.getChannelDetails);

// Messages
router.post("/messages/:channel_id", validateBody(schemas.sendMessage), validateChannelId, chatController.sendMessage);
router.get("/messages/:channel_id", validateChannelId, chatController.getMessages);
router.delete("/messages/:message_id", validateMessageId, chatController.deleteMessage);
router.put("/messages/:message_id", validateBody(schemas.editMessage), validateMessageId, chatController.editMessage);

// Seen
router.post("/seen/:channel_id", validateBody(schemas.markAsSeen), validateChannelId, chatController.markAsSeen);

module.exports = router;
