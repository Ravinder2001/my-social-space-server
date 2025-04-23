const chatModel = require("../model/chat.model");
const asyncHandler = require("../helpers/asyncHandler");

module.exports = {
  getFriendsList: asyncHandler(async (req) => {
    const friends = await chatModel.getFriendsList({
      user_id: req.user.user_id,
    });

    return {
      message: "Friend list fetched successfully",
      data: friends,
      status: 200,
    };
  }),
  createChannel: asyncHandler(async (req) => {
    const channel = await chatModel.createChannel({
      is_group: req.body.is_group || false,
      name: req.body.name || null,
      created_by: req.user.user_id,
    });

    return {
      message: "Channel created successfully",
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
      channel_id: req.body.channel_id,
      sender_id: req.user.user_id,
      message: req.body.message,
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
      after: req.query.after || null,
    });

    return {
      message: "Messages fetched successfully",
      data: messages,
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

    return {
      message: "Channels fetched successfully",
      data: channels,
      status: 200,
    };
  }),
};
