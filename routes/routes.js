const express = require("express");
const router = express.Router();

const usersRouter = require("./users.routes");
const uploadRouter = require("./upload.routes");

router.use("/user", usersRouter);
router.use("/upload", uploadRouter);

module.exports = router;
