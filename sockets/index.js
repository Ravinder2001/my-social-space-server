/* eslint-disable no-unused-vars */
const userSockets = new Map();
const guestSockets = new Map();
const config = require("../configuration/config");
const { decodeJWT } = require("../utils/common/common");
const guestStaffChatHandler = require("./staffGuestChat");
const staffChatHandler = require("./staffChat");
const videoCallHandler = require("./videoCall");
const { getUserDetailsById } = require("../model/staffModule/staffLogin.model");
const { updateUserStatus } = require("../model/staffModule/users.model");
const { USER_TYPES, SOCKET_EVENTS } = require("../utils/constant/constant");
const { validateRoomId } = require("../model/guest/guest.model");

module.exports = (io) => {
  io.on("connection", async (socket) => {
    if (socket.handshake.auth.token && socket.handshake.auth.type == USER_TYPES.GUEST) {
      let token = socket.handshake.auth.token;
      if (!token) {
        return socket.emit(SOCKET_EVENTS.ERROR, "UnAuthorized Socket Connection");
      }
      const decodeToken = decodeJWT(token);

      if (!decodeToken) {
        return socket.emit(SOCKET_EVENTS.ERROR, "UnAuthorized");
      }

      let room_details = await validateRoomId(decodeToken.room_id);

      guestSockets.set(room_details.room_id, socket);
      logGuestSockets();

      guestStaffChatHandler(io, socket, userSockets, room_details);

      socket.on("disconnect", async () => {
        console.log("User Disconnected");
        // Remove the user from the map on disconnect
        for (let [key, value] of guestSockets.entries()) {
          if (value === socket) {
            guestSockets.delete(key);
            console.log(`Removed ${key} from guestSockets`);
            break;
          }
        }

        logGuestSockets();
      });
      return;
    }

    let token = socket.handshake.auth.token;

    if (!token) {
      return socket.emit(SOCKET_EVENTS.ERROR, "UnAuthorized Socket Connection");
    }
    const decodeToken = decodeJWT(token);

    if (!decodeToken) {
      return socket.emit(SOCKET_EVENTS.ERROR, "UnAuthorized");
    }

    let userDetails = await getUserDetailsById(decodeToken.id);
    userSockets.set(userDetails.user_id, socket);

    console.log(`User Connected: ${userDetails.user_id}/${userDetails.first_name}`);

    logUserSockets();

    videoCallHandler(io, socket, userSockets, userDetails);
    staffChatHandler(io, socket, userSockets, userDetails);
    guestStaffChatHandler(io, socket, guestSockets, userDetails);

    await updateUserStatus(userDetails.user_id, true);

    socket.on("disconnect", async () => {
      await updateUserStatus(userDetails.user_id, false);
      console.log("User Disconnected");
      // Remove the user from the map on disconnect
      for (let [key, value] of userSockets.entries()) {
        if (value === socket) {
          userSockets.delete(key);
          console.log(`Removed ${key} from userSockets`);
          break;
        }
      }

      logUserSockets();
    });
  });
};

module.exports.userSockets = userSockets;
module.exports.guestSockets = guestSockets;

function logUserSockets() {
  const simpleMap = new Map();
  for (let [key, value] of userSockets.entries()) {
    simpleMap.set(key, value.id);
  }
  console.log(`Current userSockets map: ${JSON.stringify([...simpleMap])}`);
}
function logGuestSockets() {
  const simpleMap = new Map();
  for (let [key, value] of guestSockets.entries()) {
    simpleMap.set(key, value.id);
  }
  console.log(`Current guestSockets map: ${JSON.stringify([...simpleMap])}`);
}
