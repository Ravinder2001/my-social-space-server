const express = require("express");
const app = express();
const cors = require("cors");
const PORT = 5000;
const client = require("./config/db");

const config = require("./utils/config");
const Authentication_Routes = require("./routes/users.routes");
const Post_Routes = require("./routes/post.routes");
const Friends_Routes = require("./routes/friends.routes");
const Messages_Routes = require("./routes/messages.routes");

app.use(
  cors({
    origin: ["https://my-social-space.vercel.app","http://localhost:4545"],
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

const onlineUsers = new Map();

const initSocket = require("./socket_server");
const io = initSocket(server, onlineUsers);

module.exports = io;
