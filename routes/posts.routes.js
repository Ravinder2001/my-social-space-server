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
router.get("/toggleLike/:post_id", validatePostId, postController.toggleLike);

// Add a comment to a post
router.post("/comments/:post_id", validatePostId, validateBody(schemas.addComment), postController.addComment);

// Remove a comment
router.delete("/comments/:comment_id", postController.removeComment);

// Get post details
router.get("/single/:post_id", validatePostId, postController.getPost);
router.get("/", postController.getAllPosts);
router.get("/ownPosts", postController.getAllOwnPosts);
router.get("/comments/:post_id", postController.getComments);
router.get("/toggleSave/:post_id", validatePostId, postController.toggleSave);

module.exports = router;
