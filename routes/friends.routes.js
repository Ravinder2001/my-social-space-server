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
router.delete("/friends/:friend_id", friendController.removeFriend);

// Follow a user
router.post("/follow", validateBody(schemas.followUser), friendController.followUser);

// Unfollow a user
router.delete("/follow/:followed_id", friendController.unfollowUser);

// Get friend requests (PENDING by default, can specify status via query)
router.get("/requests", friendController.getFriendRequests);

// Get friends list
router.get("/friends", friendController.getFriends);

// Get followers list
router.get("/followers", friendController.getFollowers);

// Get following list
router.get("/following", friendController.getFollowing);

module.exports = router;
