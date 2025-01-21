const express = require("express");
const validateBody = require("../helpers/validateBodyHelper");
const schemas = require("../validations/posts/payloadValidation");
const PostController = require("../controller/posts.controller");
const { authenticateJWT } = require("../auth");

const router = express.Router();

router.get("/", authenticateJWT, PostController.getAllPosts);
router.get("/:post_id", authenticateJWT, PostController.getPostById);
router.post("/", authenticateJWT, validateBody(schemas.createPostSchema), PostController.createPost);
router.get("/toggleLikes/:post_id", authenticateJWT, PostController.toggleLikes);
router.post("/addComment", authenticateJWT, validateBody(schemas.commentSchema), PostController.addComment);

module.exports = router;
