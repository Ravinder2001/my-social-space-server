const express = require("express");
const authentication = require("../helpers/JWT/authentication");
const { Add_Story, Delete_Story, Get_All_Story } = require("../controllers/story.controller");
const { File_Extension } = require("../utils/constant");
const router = express.Router();
const multer = require("multer");
const { Story_Validations } = require("../helpers/body_validations/story/validator");
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post("/add", authentication, upload.single(File_Extension), Story_Validations.AddStoryBody, Add_Story);
router.delete("/delete/:story_id", authentication, Delete_Story);
router.get("/all", authentication, Get_All_Story);

module.exports = router;
