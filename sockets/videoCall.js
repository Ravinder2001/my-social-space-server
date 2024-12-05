const validateSocketBody = require("../helpers/common/validateSocketBody");
const { getChannelMembers } = require("../model/staffModule/staffChat.model");
const { generatePreSignedURL } = require("../utils/common/imageUploadToS3");
const { SOCKET_EVENTS } = require("../utils/constant/constant");
const bodySchema = require("../validations/staffService/videoCall/payloadvalidation");

module.exports = (io, socket, userSockets, userDetails) => {
  socket.on(SOCKET_EVENTS.CALL_USER, (msg) => {
    validateSocketBody(bodySchema.videoCallSchema)(socket, async (data) => {
      try {
        const receiverDetails = await getChannelMembers({
          channel_id: data.channel_id,
          user_id: userDetails.user_id,
        });

        let imageUrl = await generatePreSignedURL(userDetails.user_image);
        if (receiverDetails.length) {
          const socket = userSockets.get(receiverDetails[0].user_id);
          if (socket) {
            socket.emit(SOCKET_EVENTS.CALL_USER, {
              signal: data.signalData,
              channel_id: data.channel_id,
              receiverDetails: {
                name: userDetails.first_name,
                image_url: imageUrl,
              },
            });
          }
        }
      } catch (err) {
        console.log(err.message);
        socket.emit(SOCKET_EVENTS.ERROR, `Validation error: ${err.message}`);
      }
    })(msg);
  });
  socket.on(SOCKET_EVENTS.ANSWER_CALL, (msg) => {
    validateSocketBody(bodySchema.videoCallSchema)(socket, async (data) => {
      try {
        const receiverDetails = await getChannelMembers({
          channel_id: data.channel_id,
          user_id: userDetails.user_id,
        });
        if (receiverDetails.length) {
          const socket = userSockets.get(receiverDetails[0].user_id);
          if (socket) {
            socket.emit(SOCKET_EVENTS.CALL_ACCEPTED, {
              signal: data.signalData,
            });
          }
        }
      } catch (err) {
        console.log(err.message);
        socket.emit(SOCKET_EVENTS.ERROR, `Validation error: ${err.message}`);
      }
    })(msg);
  });
  socket.on(SOCKET_EVENTS.CALL_REJECTED, (msg) => {
    validateSocketBody(bodySchema.videoCallRejectSchema)(socket, async (data) => {
      try {
        const receiverDetails = await getChannelMembers({
          channel_id: data.channel_id,
          user_id: userDetails.user_id,
        });
        if (receiverDetails.length) {
          const socket = userSockets.get(receiverDetails[0].user_id);
          if (socket) {
            socket.emit(SOCKET_EVENTS.CALL_REJECTED);
          }
        }
      } catch (err) {
        console.log(err.message);
        socket.emit(SOCKET_EVENTS.ERROR, `Validation error: ${err.message}`);
      }
    })(msg);
  });
};
