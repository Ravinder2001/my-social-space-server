const express = require("express");
const {
  Add_Friend,
  Send_Friend_Request,
  Update_Friend_Request,
  Get_Friend_Request_List,
  Accept_Friend_Request,
} = require("../controllers/friends.controller");
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
router.post(
  "/send_friend_request",
  authentication,
  Friends_Validations.AddFriendsBody,
  Send_Friend_Request
);
router.put(
  "/accept_friend_request/:friend_request_id",
  authentication,
  Accept_Friend_Request
);
router.get("/getRequestList", authentication, Get_Friend_Request_List);

module.exports = router;
