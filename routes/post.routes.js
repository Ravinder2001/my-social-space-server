const express = require("express");
const {
  Post_Validations,
} = require("../helpers/body_validations/posts/validator");
const authentication = require("../helpers/JWT/authentication");
const {
  Add_Post,
  Get_Posts_By_UserID,
  Delete_Post,
} = require("../controllers/post.controller");
const multer = require("multer");
const { File_Extension } = require("../utils/constant");
const {
  UserIdValidation,
} = require("../helpers/db_validations/users.validations");

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post(
  "/add/:user_id",
  authentication,
  UserIdValidation,
  upload.array(File_Extension),
  Post_Validations.PostBody,
  Post_Validations.PostFile,
  Add_Post
);
router.get(
  "/all/:user_id",
  authentication,
  UserIdValidation,
  Get_Posts_By_UserID
);
router.delete("/delete/:post_id", authentication, Delete_Post);

module.exports = router;
