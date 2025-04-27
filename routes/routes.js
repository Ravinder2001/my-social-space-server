const express = require("express");
const router = express.Router();
const { authenticateJWT } = require("../auth/index");

const usersRouter = require("./users.routes");
const uploadRouter = require("./upload.routes");
const postRouter = require("./posts.routes");
const friendRouter = require("./friends.routes");
const chatRouter = require("./chat.routes");
const profileRouter = require("./profile.routes");

router.use("/user", usersRouter);
router.use("/upload", uploadRouter);
router.use("/post", authenticateJWT, postRouter);
router.use("/friend", authenticateJWT, friendRouter);
router.use("/chat", authenticateJWT, chatRouter);
router.use("/profile", authenticateJWT, profileRouter);

module.exports = router;
