const express = require("express");
const validateBody = require("../helpers/validateBodyHelper");
const schemas = require("../validations/story/payloadValidation");
const storyController = require("../controller/story.controller");
// const { validateUsername } = require("../middleware/profileValidation");
const router = express.Router();

router.get("/", storyController.getUserStories);
router.post("/", validateBody(schemas.createStory), storyController.addStory);
router.delete("/:story_id", storyController.deleteStory);

module.exports = router;
