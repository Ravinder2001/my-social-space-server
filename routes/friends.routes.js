const express = require("express");
const { Add_Friend } = require("../controllers/friends.controller");
const authentication = require("../helpers/JWT/authentication");
const {
  Friends_Validations,
} = require("../helpers/body_validations/friends/validator");
const {
  FriendIdValidation,
} = require("../helpers/db_validations/friends.validations");

const router = express.Router();

router.post(
  "/add",
  authentication,
  Friends_Validations.AddFriendsBody,
  FriendIdValidation,
  Add_Friend
);

module.exports = router;
