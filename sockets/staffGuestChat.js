const chatModel = require("../model/staffModule/guestStaffChat.model");
const { SOCKET_EVENTS } = require("../utils/constant/constant");

module.exports = (io, socket, guestSockets, guestDetails) => {
  socket.on(SOCKET_EVENTS.GUEST_CHAT_SEND_MESSAGE, (msg) => {
    (socket,
    async (validatedMsg) => {
      try {
        let response = await chatModel.sendMessage({
          ...validatedMsg,
          organization_id: guestDetails.organization_id,
        });

        const recipientSocket = guestSockets.get(response.receiverId);

        if (recipientSocket) {
          recipientSocket.emit(SOCKET_EVENTS.GUEST_CHAT_RECEIVE_MESSAGE, response.message);
        }
      } catch (err) {
        console.log(err.message);
        socket.emit(SOCKET_EVENTS.ERROR, `Validation error: ${err.message}`);
      }
    })(msg);
  });
  socket.on(SOCKET_EVENTS.GUEST_CHAT_ACCEPTED, (msg) => {
    (socket,
    async (validatedMsg) => {
      try {
        let response = await chatModel.chatAccepted({
          ...validatedMsg,
          user_id: guestDetails.user_id,
        });

        const recipientSocket = guestSockets.get(response);

        if (recipientSocket) {
          recipientSocket.emit(SOCKET_EVENTS.GUEST_CHAT_ACCEPTED, {
            channel_id: validatedMsg.channel_id,
            room_id: response,
          });
        }
      } catch (err) {
        console.log(err.message);
        socket.emit(SOCKET_EVENTS.ERROR, `Validation error: ${err.message}`);
      }
    })(msg);
  });
  socket.on(SOCKET_EVENTS.CLOSE_CONV, (msg) => {
    (socket,
    async () => {
      try {
        let response = await chatModel.chatClosed({
          channel_id: msg.channel_id,
          organization_id: guestDetails.organization_id,
        });

        const recipientSocket = guestSockets.get(response.receiverId);

        if (recipientSocket) {
          recipientSocket.emit(SOCKET_EVENTS.CLOSE_CONV, response.message);
        }
      } catch (err) {
        console.log(err.message);
        socket.emit(SOCKET_EVENTS.ERROR, `Validation error: ${err.message}`);
      }
    })(msg);
  });
};
