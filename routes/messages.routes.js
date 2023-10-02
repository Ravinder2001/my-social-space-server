const express = require("express");
const authentication = require("../helpers/JWT/authentication");
const {
  Create_Room,
  Get_Room_By_User_id,
  Send_Message,
  Get_Room_Details,
  Get_Room_Messages,
  Update_Message_Seen_Time,
} = require("../controllers/messages.controller");
const {
  Messages_Validations,
} = require("../helpers/body_validations/messages/validator");
const router = express.Router();

router.post(
  "/createRoom",
  authentication,
  Messages_Validations.CreateRoom,
  Create_Room
);
router.get("/getRooms", authentication, Get_Room_By_User_id);
router.post(
  "/sendMessage",
  authentication,
  Messages_Validations.SendMessage,
  Send_Message
);
router.get("/getRoomDetails/:room_id", authentication, Get_Room_Details);
router.get("/getRoomMessages", authentication, Get_Room_Messages);
router.get(
  "/updateMessageSeenTime/:room_id",
  authentication,
  Update_Message_Seen_Time
);
module.exports = router;
