const validateSocketBody = require("../helpers/validateSocketBody");
const bodySchema = require("../validations/chat/payloadValidation");

const { SOCKET_EVENTS } = require("../utils/constant/constant");

module.exports = (io, socket, userSockets, userDetails, activeChatsMap) => {
  socket.on(SOCKET_EVENTS.USER_TYPING, (msg) => {
    validateSocketBody(bodySchema.isTypingSocket)(socket, async (validatedMsg) => {
      const roomId = `channel_${validatedMsg.channel_id}`;
      socket.to(roomId).emit(SOCKET_EVENTS.USER_TYPING, {
        channel_id: validatedMsg.channel_id,
      });
    })(msg);
  });

  socket.on(SOCKET_EVENTS.USER_NOT_TYPING, (msg) => {
    validateSocketBody(bodySchema.isTypingSocket)(socket, async (validatedMsg) => {
      try {
        const roomId = `channel_${validatedMsg.channel_id}`;

        // Broadcast to everyone else in the room except the sender
        socket.to(roomId).emit(SOCKET_EVENTS.USER_NOT_TYPING, {
          channel_id: validatedMsg.channel_id,
        });
      } catch (err) {
        socket.emit(SOCKET_EVENTS.ERROR, `Validation error: ${err.message}`);
      }
    })(msg);
  });

  socket.on(SOCKET_EVENTS.CHAT_OPENED, (msg) => {
    validateSocketBody(bodySchema.isTypingSocket)(socket, async (validatedMsg) => {
      try {
        const roomId = `channel_${validatedMsg.channel_id}`;
        socket.join(roomId); // Join room

        const currentUserId = userDetails.user_id;
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
        const roomId = `channel_${validatedMsg.channel_id}`;
        socket.leave(roomId); // Leave room

        const currentUserId = userDetails.user_id;
        activeChatsMap.get(currentUserId)?.delete(validatedMsg.channel_id);
        if (activeChatsMap.get(currentUserId)?.size === 0) activeChatsMap.delete(currentUserId);
      } catch (err) {
        socket.emit(SOCKET_EVENTS.ERROR, `Validation error: ${err.message}`);
      }
    })(msg);
  });
};
