const express = require("express");
const app = express();
const { Server } = require("socket.io");
const cors = require("cors");
const PORT = process.env.PORT | 5000;
const client = require("./config/db");

const config = require("./utils/config");
const Authentication_Routes = require("./routes/users.routes");
const Post_Routes = require("./routes/post.routes");
const Friends_Routes = require("./routes/friends.routes");
const Messages_Routes = require("./routes/messages.routes");
const { Get_UserId_By_Socket, Get_SocketId_By_UserId, Add_Socket_User, Get_Friends_UserId } = require("./models/socket.modal");
const { UpdateUserOnlineStatus } = require("./models/users.model");

app.use(
  cors({
    origin: process.env.NODE_ENV === "production" ? [config.domain, config.localhost_domain] : [config.domain],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json());
app.use("/", Authentication_Routes);
app.use("/post", Post_Routes);
app.use("/friends", Friends_Routes);
app.use("/messages", Messages_Routes);

const server = app.listen(PORT, () => {
  console.log(`Server is running on Port ${PORT}`);
});

const io = new Server(server, {
  cors: {
    credentials: true,
    origin: process.env.NODE_ENV === "production" ? [config.domain, config.localhost_domain] : [config.domain],
  },
});
const onlineUsers = new Map();
io.on("connection", async (socket) => {
  console.log("Socket connected");
  global.chatSocket = socket;

  socket.on("Add-User", async (userId) => {
    console.log("User added");
    onlineUsers.set(userId, socket.id);
    await Add_Socket_User({ user_id: userId, socket_id: socket.id });
    await UpdateUserOnlineStatus({
      user_id: userId,
      status: "online",
      room_id: null,
    });

    const SendOnlineMessageToUsers = await Get_Friends_UserId({ user_id: userId });
    SendOnlineMessageToUsers.rows.map(async (user) => {
      const socketId = await Get_SocketId_By_UserId({ user_id: user.user_id });
      socket.to(socketId.rows[0].socket_id).emit("User is Online");
    });
  });
  socket.on("Message-Sent", async (message, user_id) => {
    delete message.sender_id;
    message.isOwnMessage = false;
    const anotherSocketId = await Get_SocketId_By_UserId({ user_id: user_id });
    socket.to(anotherSocketId.rows[0].socket_id).emit("Message-Receive", { data: message });
  });

  socket.on("disconnect", async () => {
    const disconnectedUserId = await Get_UserId_By_Socket({
      socket_id: socket.id,
    });
    if (disconnectedUserId.rows.length) {
      const SendOfflineMessageToUsers = await Get_Friends_UserId({ user_id: disconnectedUserId.rows[0].user_id });
      await UpdateUserOnlineStatus({
        user_id: disconnectedUserId.rows[0].user_id,
        status: "offline",
        room_id: null,
      });
      SendOfflineMessageToUsers.rows.map(async (user) => {
        const socketId = await Get_SocketId_By_UserId({ user_id: user.user_id });
        socket.to(socketId.rows[0].socket_id).emit("User is Offline");
      });
    }
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
