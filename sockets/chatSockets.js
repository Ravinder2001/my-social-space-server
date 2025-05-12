const validateSocketBody = require("../helpers/validateSocketBody");
const bodySchema = require("../validations/chat/payloadValidation");

const chatModel = require("../model/chat.model");
const { SOCKET_EVENTS } = require("../utils/constant/constant");

module.exports = (io, socket, userSockets, userDetails, activeChatsMap) => {
  socket.on(SOCKET_EVENTS.USER_TYPING, (msg) => {
    validateSocketBody(bodySchema.isTypingSocket)(socket, async (validatedMsg) => {
      try {
        let channelMembers = await chatModel.getChannelParticipants({
          channel_id: validatedMsg.channel_id,
        });
        channelMembers.map((member) => {
          if (member.user_id === userDetails.user_id) return;
          const recipientSocket = userSockets.get(member.user_id);
          if (recipientSocket) {
            recipientSocket.emit(SOCKET_EVENTS.USER_TYPING, {
              channel_id: validatedMsg.channel_id,
            });
          }
        });
      } catch (err) {
        socket.emit(SOCKET_EVENTS.ERROR, `Validation error: ${err.message}`);
      }
    })(msg);
  });
  socket.on(SOCKET_EVENTS.USER_NOT_TYPING, (msg) => {
    validateSocketBody(bodySchema.isTypingSocket)(socket, async (validatedMsg) => {
      try {
        let channelMembers = await chatModel.getChannelParticipants({
          channel_id: validatedMsg.channel_id,
        });
        channelMembers.map((member) => {
          if (member.user_id === userDetails.user_id) return;
          const recipientSocket = userSockets.get(member.user_id);
          if (recipientSocket) {
            recipientSocket.emit(SOCKET_EVENTS.USER_NOT_TYPING, {
              channel_id: validatedMsg.channel_id,
            });
          }
        });
      } catch (err) {
        socket.emit(SOCKET_EVENTS.ERROR, `Validation error: ${err.message}`);
      }
    })(msg);
  });
  socket.on(SOCKET_EVENTS.CHAT_OPENED, (msg) => {
    validateSocketBody(bodySchema.isTypingSocket)(socket, async (validatedMsg) => {
      try {
        const currentUserId = userDetails.user_id; // Get from auth middleware
        if (!activeChatsMap.has(currentUserId)) activeChatsMap.set(currentUserId, new Set());
        activeChatsMap.get(currentUserId).add(validatedMsg.channel_id);
      } catch (err) {
        socket.emit(SOCKET_EVENTS.ERROR, `Validation error: ${err.message}`);
      }
    })(msg);
  });
  socket.on(SOCKET_EVENTS.CHAT_CLOSED, (msg) => {
    validateSocketBody(bodySchema.isTypingSocket)(socket, async (validatedMsg) => {
      try {
        const currentUserId = userDetails.user_id; // Get from auth middleware
        activeChatsMap.get(currentUserId)?.delete(validatedMsg.channel_id);
        if (activeChatsMap.get(currentUserId)?.size === 0) activeChatsMap.delete(currentUserId);
      } catch (err) {
        socket.emit(SOCKET_EVENTS.ERROR, `Validation error: ${err.message}`);
      }
    })(msg);
  });
};
