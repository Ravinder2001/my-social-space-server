const validateSocketBody = require("../helpers/common/validateSocketBody");
const bodySchema = require("../validations/staffService/staffChat/payloadvalidation");

const chatModel = require("../model/staffModule/staffChat.model");
// const { userSockets } = require("./index");
const { SOCKET_EVENTS } = require("../utils/constant/constant");

module.exports = (io, socket, userSockets, userDetails) => {
  socket.on(SOCKET_EVENTS.STAFF_CHAT_SEND_MESSAGE, (msg) => {
    validateSocketBody(bodySchema.sendMessageSchema)(socket, async (validatedMsg) => {
      try {
        let response = await chatModel.sendMessage({
          ...validatedMsg,
          user_id: userDetails.user_id,
          organization_id: userDetails.organization_id,
        });
        response.receiverIds.map((receiverId) => {
          const recipientSocket = userSockets.get(receiverId.receiver_id);
          if (recipientSocket) {
            recipientSocket.emit(SOCKET_EVENTS.STAFF_CHAT_RECEIVE_MESSAGE, response.message);
          }
        });
      } catch (err) {
        socket.emit(SOCKET_EVENTS.ERROR, `Validation error: ${err.message}`);
      }
    })(msg);
  });
};
