const express = require("express");
const app = express();
const cors = require("cors");
const PORT = 5000;
const client = require("./config/db");

const Login_Routes = require("./routes/users.routes");
const config = require("./utils/config");

app.use(
  cors({
    origin: [config.domain],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json());
app.use("/", Login_Routes);

app.listen(PORT, () => {
  console.log(`Server is running on Port ${PORT}`);
});
