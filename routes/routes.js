const express = require("express");
const router = express.Router();
const { authenticateJWT } = require("../auth/index");

const usersRouter = require("./users.routes");
const uploadRouter = require("./upload.routes");
const postRouter = require("./posts.routes");
const friendRouter = require("./friends.routes");

router.use("/user", usersRouter);
router.use("/upload", uploadRouter);
router.use("/post", authenticateJWT, postRouter);
router.use("/friend", authenticateJWT, friendRouter);

module.exports = router;
