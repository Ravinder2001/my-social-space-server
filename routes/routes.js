const express = require("express");
const router = express.Router();
const { authenticateJWT } = require("../auth/index");

const usersRouter = require("./users.routes");
const uploadRouter = require("./upload.routes");
const postRouter = require("./posts.routes");

router.use("/user", usersRouter);
router.use("/upload", uploadRouter);
router.use("/post", authenticateJWT, postRouter);

module.exports = router;
