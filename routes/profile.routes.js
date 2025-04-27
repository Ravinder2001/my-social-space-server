const express = require("express");
// const validateBody = require("../helpers/validateBodyHelper");
// const schemas = require("../validations/posts/payloadValidation");
const postController = require("../controller/profile.controller");
// const { validatePostId, validatePostOwnership } = require("../middleware/postValidation");
const router = express.Router();

router.get("/posts", postController.getAllPosts);
router.get("/photos", postController.getAllPhotos);
router.get("/saved", postController.getAllSavedPosts);

module.exports = router;
