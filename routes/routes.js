const express = require("express");
const router = express.Router();

const usersRouter = require("./users.routes");
const postsRouter = require("./posts.routes");
const uploadRouter = require("./upload.routes");

router.use("/user", usersRouter);
router.use("/post", postsRouter);
router.use("/upload", uploadRouter);

module.exports = router;
