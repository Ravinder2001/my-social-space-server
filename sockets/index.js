const { decodeJWT } = require("../utils/common/common");
const { getUserDetailsByID, updateUserStatus } = require("../model/users.model");
const { getChannelsOfUser } = require("../model/chat.model");
// const { SOCKET_EVENTS } = require("../utils/constant/constant");
const chatSocketHandler = require("./chatSockets");
const constant = require("../utils/constant/constant");
const generateTimestamp = require("../utils/common/generateTimestamp");

const userSockets = new Map();
const activeChatsMap = new Map();

module.exports = (io) => {
  // Middleware for authentication
  io.use(async (socket, next) => {
    const token = socket.handshake.auth.token;
    if (!token) return next(new Error("Unauthorized"));

    const decoded = decodeJWT(token);
    if (!decoded) return next(new Error("Invalid Token"));

    try {
      const user = await getUserDetailsByID(decoded.id);
      if (!user) return next(new Error("User not found"));

      socket.user = user; // Attach user to socket
      next();
    } catch (err) {
      console.error("Socket Auth Error:", err);
      next(new Error("Internal Server Error"));
    }
  });

  io.on("connection", async (socket) => {
    const user = socket.user;

    // Store socket in map
    userSockets.set(user.user_id, socket);

    console.log(`User Connected: ${user.user_id} / ${user.full_name}`);
    logUserSockets();

    await updateUserStatus(user.user_id, true);
    notifyPresenceChange(io, user.user_id, true);

    // Optionally enable your chat socket handlers
    chatSocketHandler(io, socket, userSockets, user, activeChatsMap);

    socket.on("disconnect", async () => {
      await updateUserStatus(user.user_id, false);
      notifyPresenceChange(io, user.user_id, false);
      console.log(`User Disconnected: ${user.user_id}`);

      // Remove socket from map
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
module.exports.activeChatsMap = activeChatsMap;

function logUserSockets() {
  const simpleMap = new Map();
  for (let [key, value] of userSockets.entries()) {
    simpleMap.set(key, value.id); // only log socket.id
  }
  console.log("Current userSockets map:", JSON.stringify([...simpleMap]));
}

async function notifyPresenceChange(io, user_id, isOnline) {
  const userChannels = await getChannelsOfUser(user_id); // List of channel IDs

  for (const channel_id of userChannels) {
    const room = `channel_${channel_id}`;

    // Notify only those in the room (and skip the user themselves)
    io.to(room).emit(constant.SOCKET_EVENTS.USER_PRESENCE_CHANGE, {
      user_id,
      isOnline,
      channel_id,
      last_seen: generateTimestamp(),
    });
  }
}
