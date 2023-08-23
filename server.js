const express = require("express");
const app = express();
const cors = require("cors");
const PORT = 5000;
const client = require("./config/db");

const config = require("./utils/config");
const Authentication_Routes = require("./routes/users.routes");
const Post_Routes = require("./routes/post.routes");
const Friends_Routes = require("./routes/friends.routes");

app.use(
  cors({
    origin: [config.domain],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json());
app.use("/", Authentication_Routes);
app.use("/post", Post_Routes);
app.use("/friends", Friends_Routes);

app.listen(PORT, () => {
  console.log(`Server is running on Port ${PORT}`);
});
