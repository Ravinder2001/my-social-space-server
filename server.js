const express = require("express");
const app = express();
const cors = require("cors");
const http = require("http"); // Import http module
const PORT = 5000;
const client = require("./config/db");

const config = require("./utils/config");
const Authentication_Routes = require("./routes/users.routes");
const Post_Routes = require("./routes/post.routes");
const Friends_Routes = require("./routes/friends.routes");
const Messages_Routes = require("./routes/messages.routes");

app.use(
  cors({
    origin: [config.domain, config.localhost_domain],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization", "Access-Control-Allow-Origin"],
  })
);
app.use(express.json());
app.use("/", Authentication_Routes);
app.use("/post", Post_Routes);
app.use("/friends", Friends_Routes);
app.use("/messages", Messages_Routes);

const server = http.createServer(app); // Create a valid server instance

const onlineUsers = new Map();

const initSocket = require("./socket_server");
const io = initSocket(server, onlineUsers);

server.listen(PORT, () => {
  // Use server.listen() instead of app.listen()
  console.log(`Server is running on Port ${PORT}`);
});

module.exports = io;
