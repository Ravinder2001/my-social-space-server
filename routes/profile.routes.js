const express = require("express");
const validateBody = require("../helpers/validateBodyHelper");
const schemas = require("../validations/profile/payloadValidation");
const postController = require("../controller/profile.controller");
const { validateUsername } = require("../middleware/profileValidation");
const router = express.Router();

router.get("/posts", postController.getAllPosts);
router.get("/photos", postController.getAllPhotos);
router.get("/saved", postController.getAllSavedPosts);
router.get("/", postController.getProfileDetails);
router.post("/validateUsername", validateBody(schemas.validateUsername), validateUsername, postController.validateUsername);
router.put("/", validateBody(schemas.editProfileDetails), validateUsername, postController.editProfileDetails);

module.exports = router;
