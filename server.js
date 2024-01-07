const express = require("express");
const morgan = require("morgan");

const app = express();
const { Server } = require("socket.io");
const cors = require("cors");
const PORT = process.env.PORT | 5000;
const client = require("./config/db");
const jobs = require("./jobs/cronJob");

const config = require("./utils/config");
const Authentication_Routes = require("./routes/users.routes");
const Post_Routes = require("./routes/post.routes");
const Friends_Routes = require("./routes/friends.routes");
const Messages_Routes = require("./routes/messages.routes");
const Story_Routes = require("./routes/story.routes");
const Notifications_Routes = require("./routes/notifications.routes");
const GPT_Routes = require("./routes/gpt.routes");

const { Get_UserId_By_Socket, Get_SocketId_By_UserId, Add_Socket_User, Get_Friends_UserId } = require("./models/socket.modal");
const { UpdateUserOnlineStatus, GetProfilePicture } = require("./models/users.model");
const rateLimit = require("express-rate-limit");
const { GetFriendsIdByPostId, GetPostWithPostId, GetUserIdByPostId } = require("./models/post.modal");
const { CreateNotifications } = require("./models/Notifications.modal");
const { PostLikeNotification, PostCommentNotification } = require("./utils/Notifications");

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  limit: 100,
});

app.use(limiter);
app.use(morgan("dev"));
app.use(
  cors({
    origin: "https://my-social-space.vercel.app/",
  })
);

app.use(express.json());
app.use("/", Authentication_Routes);
app.use("/post", Post_Routes);
app.use("/friends", Friends_Routes);
app.use("/messages", Messages_Routes);
app.use("/story", Story_Routes);
app.use("/notifications", Notifications_Routes);
app.use("/GPT", GPT_Routes);

const server = app.listen(PORT, () => {
  console.log(`Server is running on Port ${PORT}`);
});

const io = new Server(server, {
  cors: {
    credentials: true,
    origin: "*",
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
      status: 1,
    });

    const SendOnlineMessageToUsers = await Get_Friends_UserId({ user_id: userId });
    SendOnlineMessageToUsers.rows.map(async (user) => {
      const socketId = await Get_SocketId_By_UserId({ user_id: user.user_id });
      socket.to(socketId.rows[0].socket_id).emit("User-Online");
    });
  });
  socket.on("Message-Sent", async (message, user_id) => {
    delete message.sender_id;
    message.isOwnMessage = false;
    const anotherSocketId = await Get_SocketId_By_UserId({ user_id: user_id });
    if (anotherSocketId.rows.length) {
      socket.to(anotherSocketId.rows[0].socket_id).emit("Message-Receive", { data: message });
    }
  });
  socket.on("Message-Sent-Notifications", async (message, user_id) => {
    const anotherSocketId = await Get_SocketId_By_UserId({ user_id: user_id });
    if (anotherSocketId.rows.length) {
      socket.to(anotherSocketId.rows[0].socket_id).emit("Message-Sent-Notifications", { data: message });
    }
  });
  socket.on("Message-Edited", async (user_id) => {
    const anotherSocketId = await Get_SocketId_By_UserId({ user_id: user_id });
    if (anotherSocketId.rows.length) {
      socket.to(anotherSocketId.rows[0].socket_id).emit("Message-Edited");
    }
  });
  socket.on("User-Typing", async (user_id) => {
    const anotherSocketId = await Get_SocketId_By_UserId({ user_id: user_id });

    if (anotherSocketId.rows.length) {
      socket.to(anotherSocketId.rows[0].socket_id).emit("User-Typing");
    }
  });
  socket.on("User-Not-Typing", async (user_id) => {
    const anotherSocketId = await Get_SocketId_By_UserId({ user_id: user_id });
    if (anotherSocketId.rows.length) {
      socket.to(anotherSocketId.rows[0].socket_id).emit("User-Not-Typing");
    }
  });
  socket.on("Like-Toogle", async ({ post_id, isLiked, UserName, UserId, image }) => {
    const SendOnlineAlertToUsers = await GetFriendsIdByPostId({ post_id });
    const admin_Id = await GetPostWithPostId({ post_id });
    SendOnlineAlertToUsers.rows.push({ friend_id: admin_Id.rows[0].user_id });
    SendOnlineAlertToUsers.rows.map(async (user) => {
      const socketId = await Get_SocketId_By_UserId({ user_id: user.friend_id });
      socket.to(socketId.rows[0].socket_id).emit("Like-Toogle");
    });
    if (isLiked && UserId != admin_Id.rows[0].user_id) {
      const image_res = await GetProfilePicture({ user_id: UserId });
      await CreateNotifications({
        user_id: admin_Id.rows[0].user_id,
        notification_type: "like",
        message: `${UserName} ${PostLikeNotification}`,
        image: image_res.rows[0].image_url ?? null,
      });
      const socketId = await Get_SocketId_By_UserId({ user_id: admin_Id.rows[0].user_id });
      socket.to(socketId.rows[0].socket_id).emit("Notification");
    }
  });
  socket.on("Comment-Notifications", async ({ post_id, UserName, UserId, image }) => {
    const admin_Id = await GetPostWithPostId({ post_id });
    if (UserId != admin_Id.rows[0].user_id) {
      const image_res = await GetProfilePicture({ user_id: UserId });
      await CreateNotifications({
        user_id: admin_Id.rows[0].user_id,
        notification_type: "comment",
        message: `${UserName} ${PostCommentNotification}`,
        image: image_res.rows[0].image_url ?? null,
      });
      const socketId = await Get_SocketId_By_UserId({ user_id: admin_Id.rows[0].user_id });
      socket.to(socketId.rows[0].socket_id).emit("Notification");
    }
  });

  socket.on("disconnect", async () => {
    const disconnectedUserId = await Get_UserId_By_Socket({
      socket_id: socket.id,
    });
    if (disconnectedUserId.rows.length) {
      // console.log("Disconnected",disconnectedUserId.rows)
      const SendOfflineMessageToUsers = await Get_Friends_UserId({ user_id: disconnectedUserId.rows[0].user_id });
      await UpdateUserOnlineStatus({
        user_id: disconnectedUserId.rows[0].user_id,
        status: 0,
      });
      SendOfflineMessageToUsers.rows.map(async (user) => {
        const socketId = await Get_SocketId_By_UserId({ user_id: user.user_id });
        socket.to(socketId.rows[0].socket_id).emit("User-Offline");
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
