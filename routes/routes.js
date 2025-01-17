const express = require("express");
const router = express.Router();

const usersRouter = require("./users.routes");
const postsRouter = require("./posts.routes");
const uploadRouter = require("./upload.routes");
const friendRouter = require("./friends.routes");

router.use("/user", usersRouter);
router.use("/post", postsRouter);
router.use("/upload", uploadRouter);
router.use("/friend", friendRouter);

module.exports = router;
