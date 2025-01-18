const express = require("express");
// const validateBody = require("../helpers/validateBodyHelper");
// const schemas = require("../validations/posts/payloadValidation");
const FriendController = require("../controller/friends.controller");
const { authenticateJWT } = require("../auth");

const router = express.Router();

router.get("/sendFriendReq/:receiver_id", authenticateJWT, FriendController.sendFriendReq);
router.get("/acceptFriendReq/:request_id", authenticateJWT, FriendController.acceptFriendReq);
router.delete("/deleteFriendReq/:request_id", authenticateJWT, FriendController.deleteFriendReq);

module.exports = router;
