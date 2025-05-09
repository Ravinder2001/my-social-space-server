const validateSocketBody = require("../helpers/validateSocketBody");
const bodySchema = require("../validations/chat/payloadValidation");

const chatModel = require("../model/chat.model");
// const { userSockets } = require("./index");
const { SOCKET_EVENTS } = require("../utils/constant/constant");

module.exports = (io, socket, userSockets, userDetails) => {
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
};
