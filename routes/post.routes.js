const express = require("express");
const {
  Post_Validations,
} = require("../helpers/body_validations/posts/validator");
const authentication = require("../helpers/JWT/authentication");
const { Add_Post } = require("../controllers/post.controller");
const multer = require("multer");
const { File_Extension } = require("../utils/constant");

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post(
  "/add/:user_id",
  authentication,
  upload.single(File_Extension),
  Post_Validations.PostFile,
  Add_Post
);

module.exports = router;
