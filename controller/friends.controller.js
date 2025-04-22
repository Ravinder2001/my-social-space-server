const friendModel = require("../model/friends.model");
const asyncHandler = require("../helpers/asyncHandler");

module.exports = {
  sendFriendRequest: asyncHandler(async (req) => {
    const request = await friendModel.sendFriendRequest({
      sender_id: req.user.user_id,
      receiver_id: req.body.receiver_id,
    });
    return {
      message: "Friend request sent successfully",
      data: request,
      status: 201,
    };
  }),

  respondFriendRequest: asyncHandler(async (req) => {
    const { request_id } = req.params;
    const { status } = req.body;
    const request = await friendModel.respondFriendRequest({
      request_id,
      user_id: req.user.user_id,
      status,
    });
    return {
      message: `Friend request ${status}`,
      data: request,
      status: 200,
    };
  }),

  removeFriend: asyncHandler(async (req) => {
    const { friend_id } = req.params;
    const result = await friendModel.removeFriend({
      user_id: req.user.user_id,
      friend_id,
    });
    return {
      message: result.message,
      data: { friendship_id: result.friendship_id },
      status: 200,
    };
  }),

  followUser: asyncHandler(async (req) => {
    const follow = await friendModel.followUser({
      follower_id: req.user.user_id,
      followed_id: req.body.followed_id,
    });
    return {
      message: "Followed successfully",
      data: follow,
      status: 201,
    };
  }),

  unfollowUser: asyncHandler(async (req) => {
    const { followed_id } = req.params;
    const result = await friendModel.unfollowUser({
      follower_id: req.user.user_id,
      followed_id,
    });
    return {
      message: result.message,
      data: { follow_id: result.follow_id },
      status: 200,
    };
  }),

  getFriendRequests: asyncHandler(async (req) => {
    const { status = "PENDING" } = req.query;
    const requests = await friendModel.getFriendRequests({
      user_id: req.user.user_id,
      status,
    });
    return {
      message: "Friend requests retrieved successfully",
      data: requests,
      status: 200,
    };
  }),

  getFriends: asyncHandler(async (req) => {
    const friends = await friendModel.getFriends({
      user_id: req.user.user_id,
    });
    return {
      message: "Friends retrieved successfully",
      data: friends,
      status: 200,
    };
  }),

  getFollowers: asyncHandler(async (req) => {
    const followers = await friendModel.getFollowers({
      user_id: req.user.user_id,
    });
    return {
      message: "Followers retrieved successfully",
      data: followers,
      status: 200,
    };
  }),

  getFollowing: asyncHandler(async (req) => {
    const following = await friendModel.getFollowing({
      user_id: req.user.user_id,
    });
    return {
      message: "Following retrieved successfully",
      data: following,
      status: 200,
    };
  }),
};
