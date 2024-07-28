const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const { Server } = require("socket.io");
// const jobs = require("./jobs/cronJob");
const client = require("./configuration/db");
const config = require("./configuration/config");
const bodyParser = require("body-parser");
const socketHandlers = require("./sockets/index");

const PORT = process.env.PORT | 5000;

const app = express();

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  limit: 100,
});

app.use(limiter);
app.use(morgan("dev"));
app.use(
  cors({
    origin: "*",
  })
);
app.disable("x-powered-by"); // Disable the X-Powered-By header
app.use(express.json());
app.use(bodyParser.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));
app.use((req, res, next) => {
  res.setHeader("Cache-Control", "no-cache, no-store");
  next();
});

const io = app.listen(PORT, () => {
  console.log(`Server is running on Port ${PORT}`);
});
socketHandlers(io);
