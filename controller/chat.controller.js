const chatModel = require("../model/chat.model");
const asyncHandler = require("../helpers/asyncHandler");
const { generatePreSignedURL } = require("../utils/common/imageUploadToS3");
const { userSockets } = require("../sockets");
const { SOCKET_EVENTS } = require("../utils/constant/constant");

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
      channel_id: req.params.channel_id,
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
      channel_id: req.params.channel_id,
    });

    const userImage = await generatePreSignedURL(req.user.profile_picture);
    // Emit the message to all participants in the channel
    await Promise.all(
      message.channelMembers.map((member) => {
        const socket = userSockets.get(member.user_id);
        if (socket) {
          let messageObj = {
            message_id: message.message_id,
            message: req.body.message,
            sent_at: message.sent_at,
            content_type: req.body.content_type,
            ownMessage: false,
            channel_id: req.body.channel_id,
            name: req.user.full_name,
            profile_picture: userImage,
          };
          socket.emit(SOCKET_EVENTS.MSG_RECEIVED, messageObj);
        }
      })
    );

    return {
      message: "Message sent successfully",
      data: {
        message_id: message.message_id,
        sent_at: message.sent_at,
      },
      status: 201,
    };
  }),
  getMessages: asyncHandler(async (req) => {
    const messages = await chatModel.getMessages({
      channel_id: req.params.channel_id,
    });

    const updatedMessages = await Promise.all(
      messages.map(async (post) => {
        if (post.content_type === "photo" && !post.is_deleted) {
          post.message = await generatePreSignedURL(post.message);
        }
        if (post.sender_id == req.user.user_id) {
          post.ownMessage = true;
        } else {
          post.ownMessage = false;
        }
        if (post.is_deleted) {
          post.message = "This message has been deleted";
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
      channel_id: req.params.channel_id,
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
        if (post.is_deleted) {
          post.last_message = "This message has been deleted";
        }
        delete post.is_deleted;
        return post;
      })
    );

    return {
      message: "Channels fetched successfully",
      data: updatedUsers,
      status: 200,
    };
  }),
  deleteMessage: asyncHandler(async (req) => {
    const deletedMessage = await chatModel.deleteMessage({
      message_id: req.params.message_id,
      user_id: req.user.user_id,
    });

    // Emit deletion event to channel participants
    const channelMembers = await chatModel.getChannelParticipants({
      channel_id: deletedMessage.channel_id,
    });

    await Promise.all(
      channelMembers.map((member) => {
        const socket = userSockets.get(member.user_id);
        if (socket && member.user_id !== req.user.user_id) {
          socket.emit(SOCKET_EVENTS.MSG_DELETED, {
            message_id: deletedMessage.message_id,
            channel_id: deletedMessage.channel_id,
          });
        }
      })
    );

    return {
      message: "Message deleted successfully",
      status: 200,
    };
  }),

  editMessage: asyncHandler(async (req) => {
    const editedMessage = await chatModel.editMessage({
      message_id: req.params.message_id,
      user_id: req.user.user_id,
      new_message: req.body.message,
    });

    // Emit edit event to channel participants
    const channelMembers = await chatModel.getChannelParticipants({
      channel_id: editedMessage.channel_id,
    });

    await Promise.all(
      channelMembers.map((member) => {
        const socket = userSockets.get(member.user_id);
        if (socket && member.user_id !== req.user.user_id) {
          socket.emit(SOCKET_EVENTS.MSG_EDITED, {
            message_id: editedMessage.message_id,
            channel_id: editedMessage.channel_id,
            message: editedMessage.message,
          });
        }
      })
    );

    return {
      message: "Message edited successfully",
      status: 200,
    };
  }),
};
