const friendModel = require("../model/friends.model");
const asyncHandler = require("../helpers/asyncHandler");
const { generatePreSignedURL } = require("../utils/common/imageUploadToS3");
const { createNotification } = require("../model/notification.model");

module.exports = {
  sendFriendRequest: asyncHandler(async (req) => {
    const request = await friendModel.sendFriendRequest({
      sender_id: req.user.user_id,
      receiver_id: req.body.receiver_id,
    });

    await createNotification({
      user_id: req.body.receiver_id,
      type: "FRIEND_REQUEST",
      request_id: request.request_id,
    });

    return {
      message: "Friend request sent successfully",
      status: 201,
    };
  }),

  respondFriendRequest: asyncHandler(async (req) => {
    const { request_id } = req.params;
    const { status } = req.body;
    await friendModel.respondFriendRequest({
      request_id,
      user_id: req.user.user_id,
      status,
    });
    return {
      message: `Friend request ${status}`,
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

  getFriendRequests: asyncHandler(async (req) => {
    const requests = await friendModel.getFriendRequests({
      user_id: req.user.user_id,
    });
    const updatedUsers = await Promise.all(
      requests.map(async (post) => {
        if (post.sender_picture) {
          post.sender_picture = await generatePreSignedURL(post.sender_picture);
        }
        return post;
      })
    );
    return {
      message: "Friend requests retrieved successfully",
      data: updatedUsers,
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

  searchUsers: asyncHandler(async (req) => {
    const usersList = await friendModel.searchUsers(req.query.name, req.user.user_id);
    const updatedUsers = await Promise.all(
      usersList.map(async (post) => {
        if (post.profile_picture) {
          post.profile_picture = await generatePreSignedURL(post.profile_picture);
        }
        return post;
      })
    );
    return {
      message: "Users list retrieved successfully",
      data: updatedUsers,
      status: 200,
    };
  }),
};
