const express = require("express");
const validateBody = require("../helpers/validateBodyHelper");
const schemas = require("../validations/posts/payloadValidation");
const postController = require("../controller/posts.controller");
const { validatePostId, validatePostOwnership } = require("../middleware/postValidation");
const router = express.Router();

// Create a new post
router.post("/", validateBody(schemas.createPost), postController.createPost);
router.post("/generate-caption", validateBody(schemas.generateCaption), postController.generateCaption);

// Delete a post
router.delete("/:post_id", validatePostId, validatePostOwnership, postController.deletePost);

// Edit a post
router.put("/:post_id", validatePostId, validatePostOwnership, validateBody(schemas.editPost), postController.editPost);

// Toggle like on a post
router.get("/:post_id/like", validatePostId, postController.toggleLike);

// Add a comment to a post
router.post("/:post_id/comments", validatePostId, validateBody(schemas.addComment), postController.addComment);

// Remove a comment
router.delete("/comments/:comment_id", postController.removeComment);

// Get post details
router.get("/single/:post_id", validatePostId, postController.getPost);
router.get("/", postController.getAllPosts);
router.get("/ownPosts", postController.getAllOwnPosts);

module.exports = router;
