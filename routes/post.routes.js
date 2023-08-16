const express = require("express");
const {
  Post_Validations,
} = require("../helpers/body_validations/posts/validator");
const authentication = require("../helpers/JWT/authentication");
const {
  Add_Post,
  Get_Posts_By_UserID,
  Delete_Post,
  Add_Comment,
  Add_Like,
  Remove_Like,
  Get_Posts_Comments,
  Get_Posts_Likes,
  Get_Posts_By_PostID,
} = require("../controllers/post.controller");
const multer = require("multer");
const { File_Extension } = require("../utils/constant");
const {
  UserIdValidation,
  TokenRequestValidation,
} = require("../helpers/db_validations/users.validations");
const {
  PostIdValidation,
} = require("../helpers/db_validations/post.validations");

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post(
  "/add/:user_id",
  authentication,
  TokenRequestValidation,
  UserIdValidation,
  upload.array(File_Extension),
  Post_Validations.PostBody,
  Post_Validations.PostFile,
  Add_Post
);
router.get(
  "/all/:user_id",
  authentication,
  TokenRequestValidation,
  UserIdValidation,
  Get_Posts_By_UserID
);
router.delete("/delete/:post_id", authentication, Delete_Post);
router.post(
  "/comment/add/:post_id",
  authentication,
  Post_Validations.CommentBody,
  TokenRequestValidation,
  PostIdValidation,
  Add_Comment
);
router.post(
  "/like/add/:post_id",
  authentication,
  Post_Validations.LikeBody,
  TokenRequestValidation,
  PostIdValidation,
  Add_Like
);
router.post(
  "/like/remove/:post_id",
  authentication,
  Post_Validations.LikeBody,
  TokenRequestValidation,
  PostIdValidation,
  Remove_Like
);
router.get("/comment/get/:post_id", authentication, Get_Posts_Comments);
router.get("/like/get/:post_id", authentication, Get_Posts_Likes);
router.get(
  "/single/:user_id/:post_id",
  authentication,
  TokenRequestValidation,
  UserIdValidation,
  Get_Posts_By_PostID
);

module.exports = router;
