const chatModel = require("../model/chat.model");
const asyncHandler = require("../helpers/asyncHandler");
const { generatePreSignedURL } = require("../utils/common/imageUploadToS3");

module.exports = {
  getFriendsList: asyncHandler(async (req) => {
    const friends = await chatModel.getFriendsList({
      user_id: req.user.user_id,
      searchQuery: req.query.searchQuery || null,
    });
    const updatedUsers = await Promise.all(
      friends.map(async (post) => {
        if (post.profile_picture) {
          post.profile_picture = await generatePreSignedURL(post.profile_picture);
        }
        return post;
      })
    );
    return {
      message: "Friend list fetched successfully",
      data: updatedUsers,
      status: 200,
    };
  }),
  createChannelWithUsers: asyncHandler(async (req) => {
    const { is_group, name, user_ids } = req.body;
    const created_by = req.user.user_id;

    // Step 1: Create channel
    const channel = await chatModel.createChannel({ is_group, name, created_by });

    // Step 2: Add users (including creator if not in list)
    const participants = [...new Set([...user_ids, created_by])];
    await chatModel.addParticipantsToChannel({ channel_id: channel.channel_id, user_ids: participants });

    return {
      message: "Channel created and participants added successfully",
      data: channel,
      status: 201,
    };
  }),

  addParticipantsToChannel: asyncHandler(async (req) => {
    await chatModel.addParticipantsToChannel({
      channel_id: req.body.channel_id,
      user_ids: req.body.user_ids,
    });

    return {
      message: "Participants added to channel",
      status: 200,
    };
  }),
  sendMessage: asyncHandler(async (req) => {
    const message = await chatModel.sendMessage({
      ...req.body,
      sender_id: req.user.user_id,
    });

    return {
      message: "Message sent successfully",
      data: message,
      status: 201,
    };
  }),
  getMessages: asyncHandler(async (req) => {
    const messages = await chatModel.getMessages({
      channel_id: req.params.channel_id,
    });

    const updatedMessages = await Promise.all(
      messages.map(async (post) => {
        if (post.content_type === "photo") {
          post.message = await generatePreSignedURL(post.message);
        }
        if (post.sender_id == req.user.user_id) {
          post.ownMessage = true;
        } else {
          post.ownMessage = false;
        }
        delete post.sender_id;
        return post;
      })
    );

    return {
      message: "Messages fetched successfully",
      data: updatedMessages,
      status: 200,
    };
  }),
  markAsSeen: asyncHandler(async (req) => {
    await chatModel.markAsSeen({
      channel_id: req.body.channel_id,
      user_id: req.user.user_id,
      seen_at: new Date(), // Or req.body.seen_at if you're sending client timestamp
    });

    return {
      message: "Message marked as seen",
      status: 200,
    };
  }),
  getUserChannels: asyncHandler(async (req) => {
    const channels = await chatModel.getUserChannels({
      user_id: req.user.user_id,
    });
    const updatedUsers = await Promise.all(
      channels.map(async (post) => {
        if (post.profile_picture) {
          post.profile_picture = await generatePreSignedURL(post.profile_picture);
        }
        return post;
      })
    );

    return {
      message: "Channels fetched successfully",
      data: updatedUsers,
      status: 200,
    };
  }),
};
