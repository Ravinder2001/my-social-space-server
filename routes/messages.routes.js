const express = require("express");
const authentication = require("../helpers/JWT/authentication");
const {
  Create_Room,
  Get_Room_By_User_id,
  Send_Message,
  Get_Room_Details,
  Get_Room_Messages,
  Update_Message_Seen_Time,
  Update_Message_Content,
  Update_Message_Status,
  Delete_Room_Messages,
  Delete_Chat_History,
  Update_Seen_Message,
  Get_Seen_Message,
  Get_Room_Members,
} = require("../controllers/messages.controller");
const { Messages_Validations } = require("../helpers/body_validations/messages/validator");
const router = express.Router();

router.post("/createRoom", authentication, Messages_Validations.CreateRoom, Create_Room);
router.get("/getRooms", authentication, Get_Room_By_User_id);
router.post("/sendMessage", authentication, Messages_Validations.SendMessage, Send_Message);
router.get("/getRoomMembers/:room_id", authentication, Get_Room_Members);
router.get("/getRoomMessages", authentication, Get_Room_Messages);
router.get("/updateMessageSeenTime/:room_id", authentication, Update_Message_Seen_Time);
router.put("/updateMessageContent", authentication, Messages_Validations.UpdateMessageContent, Update_Message_Content);
router.put("/updateMessageStatus", authentication, Messages_Validations.UpdateMessageStatus, Update_Message_Status);
router.delete("/deleteChatHistory/:room_id", authentication, Delete_Chat_History);
router.post("/updateSeenMessage", authentication, Messages_Validations.UpdateMessageSeen, Update_Seen_Message);
router.post("/getSeenMessage", authentication, Messages_Validations.GetMessageSeen, Get_Seen_Message);
module.exports = router;
