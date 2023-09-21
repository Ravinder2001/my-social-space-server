const moment = require("moment/moment");
const {
  CreateRoom,
  AddMembers,
  GetRoomsByUserId,
  SendMessage,
  GetRoomDetails,
  GetRoomMessages,
  UpdateMessageVisibility,
  UpdateMessageVisibilityForRoom,
  UpdateMessageSeenTime,
} = require("../models/messages.modal");
const { Image_Link } = require("../s3_bucket.config");
const { Bad, Success } = require("../utils/constant");
const { Something } = require("../utils/message");
const { v4: uuidv4 } = require("uuid");
module.exports = {
  Create_Room: async (req, res) => {
    try {
      let room_id = uuidv4();
      const room = await CreateRoom({
        id: room_id,
        type: req.body.type,
        name: req.body.type == 2 ? req.body.name : null,
        image_url: req.body.type == 2 ? req.body.image_url : null,
      });
      let adminObject = {
        user_id: req.customData,
        isMessageAllowed: true,
      };
      req.body.users.push(adminObject);

      if (room.rowCount > 0) {
        req.body.users.map(async (member) => {
          await AddMembers({
            room_id,
            user_id: member.user_id,
            ismessageallowed: member.isMessageAllowed,
          });
        });
        return res.status(Success).json({ status: Success });
      }
      res.status(Bad).json({ message: Something, status: Bad });
    } catch (err) {
      res.status(Bad).json({ message: err.message, status: Bad });
    }
  },
  Get_Room_By_User_id: async (req, res) => {
    try {
      const response = await GetRoomsByUserId({ user_id: req.customData });
      await Promise.all(
        response.rows.map(async (image) => {
          let url = await Image_Link(image.image_url);
          image.image_url = url;
        })
      );
      res.status(Success).json({ data: response.rows, status: Success });
    } catch (err) {
      res.status(Bad).json({ message: err.message, status: Bad });
    }
  },
  Send_Message: async (req, res) => {
    try {
      const response = await SendMessage({
        room_id: req.body.room_id,
        sender_id: req.customData,
        content: req.body.content,
        content_type: req.body.content_type,
      });
      res.status(Success).json({ status: Success });
    } catch (err) {
      res.status(Bad).json({ message: err.message, status: Bad });
    }
  },
  Get_Room_Details: async (req, res) => {
    try {
      const response = await GetRoomDetails({
        room_id: req.params.room_id,
        user_id: req.customData,
      });
      if (response.rows.length) {
        const link = await Image_Link(response.rows[0].image_url);
        response.rows[0].image_url = link;
        return res
          .status(Success)
          .json({ data: response.rows[0], status: Success });
      }
      return res.status(Bad).json({ message: Something, status: Bad });
    } catch (err) {
      res.status(Bad).json({ message: err.message, status: Bad });
    }
  },
  Get_Room_Messages: async (req, res) => {
    try {
      const response = await GetRoomMessages({
        room_id: req.params.room_id,
      });
      if (response.rows.length) {
        response.rows.map((message) => {
          if (message.sender_id == req.customData) {
            message.isOwnMessage = true;
          } else {
            message.isOwnMessage = false;
          }
          if (!message.status) {
            delete message.content;
            delete message.content_type;
            delete message.visibility;
          }
          delete message.sender_id;
        });
      }

      return res.status(Success).json({ data: response.rows, status: Success });
    } catch (err) {
      res.status(Bad).json({ message: err.message, status: Bad });
    }
  },
  Update_Message_Seen_Time: async (req, res) => {
    try {
      await UpdateMessageSeenTime({
        room_id: req.params.room_id,
        receiver_id: req.customData,
      });

      return res.status(Success).json({ status: Success });
    } catch (err) {
      res.status(Bad).json({ message: err.message, status: Bad });
    }
  },
};
