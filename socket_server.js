const socket = require("socket.io");
const moment = require("moment");
const config = require("./utils/config");
const { Update_User_Online_Status } = require("./controllers/users.controller");
const { Add_User, Get_UserId_By_Socket, Get_SocketId_By_UserId } = require("./models/socket.modal");
const { UpdateUserOnlineStatus } = require("./models/users.model");

const initSocket = (server, onlineUsers) => {
  const io = socket(server, {
    cors: [config.localhost_domain, config.domain],
    Credential: true,
  });

  io.on("connection", async (socket) => {
    console.log("Socket connected");
    global.chatSocket = socket;

    socket.on("Add-User", async (userId) => {
      console.log("User added")
      onlineUsers.set(userId, socket.id);
      await Add_User({ user_id: userId, socket_id: socket.id });
      await UpdateUserOnlineStatus({
        user_id: userId,
        status: "online",
        room_id: null,
      });
    });
    socket.on("Message-Sent", async (message, user_id) => {
      delete message.sender_id;
      message.isOwnMessage = false;
      const anotherSocketId = await Get_SocketId_By_UserId({ user_id: user_id });
      socket.to(anotherSocketId.rows[0].socket_id).emit("Message-Receive", { data: message });
    });

    socket.on("disconnect", async () => {
      const disconnectedUserId = await Get_UserId_By_Socket({ socket_id: socket.id });
      if (disconnectedUserId.rows.length)
        await UpdateUserOnlineStatus({
          user_id: disconnectedUserId.rows[0].user_id,
          status: "offline",
          room_id: null,
        });
    });
  });

  const getUserIdBySocketId = (socketId) => {
    for (const [userId, id] of onlineUsers.entries()) {
      if (id === socketId) {
        return userId;
      }
    }
    return null;
  };

  return io;
};

module.exports = initSocket;
