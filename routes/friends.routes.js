const express = require("express");
const validateBody = require("../helpers/validateBodyHelper");
const schemas = require("../validations/friends/payloadValidation");
const friendController = require("../controller/friends.controller");
// const { validatePostId, validatePostOwnership } = require("../middleware/postValidation");
const router = express.Router();

// Send a friend request
router.post("/requests", validateBody(schemas.sendFriendRequest), friendController.sendFriendRequest);

// Respond to a friend request (accept/reject)
router.put("/requests/:request_id", validateBody(schemas.respondFriendRequest), friendController.respondFriendRequest);

// Remove a friend
router.delete("/friends/:friendship_id", friendController.removeFriend);

// Get friend requests (PENDING by default, can specify status via query)
router.get("/requests", friendController.getFriendRequests);

// Get friends list
router.get("/friends", friendController.getFriends);

router.get("/searchUsers", friendController.searchUsers);

module.exports = router;
