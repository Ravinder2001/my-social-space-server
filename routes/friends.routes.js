const express = require("express");
const {
  Add_Friend,
  Send_Friend_Request,
  Update_Friend_Request,
  Get_Friend_Request_List,
  Accept_Friend_Request,
  Delete_Friend_Request,
  Delete_Friendship,
  Get_Friend_List,
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
  "/send_friend_request",
  authentication,
  Friends_Validations.AddFriendsBody,
  Send_Friend_Request
);
router.put("/accept_friend_request", authentication, Accept_Friend_Request);
router.delete(
  "/delete_friend_request/:friend_request_id",
  authentication,
  Delete_Friend_Request
);
router.delete("/unfriend/:user_id", authentication, Delete_Friendship);
router.get("/getRequestList", authentication, Get_Friend_Request_List);
router.get("/getFriendList", authentication, Get_Friend_List);

module.exports = router;
