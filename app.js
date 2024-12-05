const express = require("express");
const passport = require("passport");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const moment = require("moment");

const { Server } = require("socket.io");

const socketHandlers = require("./sockets/index");
const superAdminRouter = require("./routes/superAdmin/routes");
const guestAdminRouter = require("./routes/guestAdmin/routes");
const staffModuleRouter = require("./routes/staffService/routes");
const guestRouter = require("./routes/guest/routes");
const commanRouter = require("./routes/comman/comman.routes");
const uploadRouter = require("./routes/comman/upload.routes");
const setupSwaggerRoutes = require("./service/swagger/swaggerRoutes");
const config = require("./configuration/config");

require("./jobs/cronJob");
require("./auth/index");

const port = config.PORT;
const app = express();

const corsOptions = {
  origin: "*", // Allow requests from this org
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"], // Allow only GET and POST requests
  optionsSuccessStatus: 200, // Some legacy browsers (IE11, various SmartTVs) choke on 204
};

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 300, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
  standardHeaders: "draft-7", // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
});

morgan.token("ist-date", () => {
  return moment().utcOffset("+05:30").format("DD/MMM/YYYY:HH:mm:ss Z");
});

// Define user ID custom token
morgan.token("user", (req) => {
  return req.userId || "Guest";
});

app.use(cors(corsOptions));
app.use(limiter);
app.disable("x-powered-by"); // Disable the X-Powered-By header

// ? Passport initialization
app.use(passport.initialize());

// Middleware
app.use(express.json());
app.use(bodyParser.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));

// Middleware to set Cache-Control header for all routes
app.use((req, res, next) => {
  res.setHeader("Cache-Control", "no-cache, no-store");
  next();
});
app.use((req, res, next) => {
  const userId = req.headers["x-user-id"]; // Extract custom header
  if (userId) {
    req.userId = userId; // Attach it to the request object
  }
  next();
});

app.use(morgan(":method :url :status - userId: :user - :ist-date"));

setupSwaggerRoutes(app);

app.use("/superAdmin", superAdminRouter);
app.use("/guestAdmin", guestAdminRouter);
app.use("/staffModule", staffModuleRouter);
app.use("/guest", guestRouter);
app.use("/comman", commanRouter);
app.use("/upload", uploadRouter);

const server = app.listen(port, () => {
  process.stdout.write(`Server is running on port ${port}\n`);
});

const io = new Server(server, {
  cors: {
    credentials: true,
    origin: "*",
  },
});

// Initialize socket handlers
socketHandlers(io);
