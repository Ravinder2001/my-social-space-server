const express = require("express");
const validateBody = require("../helpers/validateBodyHelper");
const schemas = require("../validations/posts/payloadValidation");
const PostController = require("../controller/posts.controller");
const { authenticateJWT } = require("../auth");

const router = express.Router();

router.get("/", authenticateJWT, PostController.getAllPosts);
router.post("/", authenticateJWT, validateBody(schemas.createPostSchema), PostController.createPost);

module.exports = router;
