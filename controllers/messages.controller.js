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
  UpdateMessageContent,
  UpdateMessageStatus,
  Delete_Room_Message,
  DeleteChatHistory,
  UpdateSeenMessage,
  GetSeenMessage,
  GetRoomMembers,
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
      });
      let adminObject = {
        user_id: req.customData,
        isMessageAllowed: true,
        role: "admin",
      };
      req.body.users.push(adminObject);

      if (room.rowCount > 0) {
        req.body.users.map(async (member) => {
          await AddMembers({
            room_id,
            user_id: member.user_id,
            ismessageallowed: member.isMessageAllowed,
            role: member.role ? member.role : null,
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
          if (image.image_url) {
            let url = await Image_Link(image.image_url);
            image.image_url = url;
          }
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
      response.rows[0].isOwnMessage = true;

      res.status(Success).json({ data: response.rows[0], status: Success });
    } catch (err) {
      res.status(Bad).json({ message: err.message, status: Bad });
    }
  },
  Get_Room_Members: async (req, res) => {
    try {
      const response = await GetRoomMembers({
        room_id: req.params.room_id,
      });
      let currentUser;
      await Promise.all(
        response.rows.map(async (image, index) => {
          if (image.id == req.customData) {
            currentUser = image;
          }
          if (image.image_url) {
            let url = await Image_Link(image.image_url);
            image.image_url = url;
            image.id = index + 1;
          }
        })
      );
      res.status(Success).json({ data: { members: response.rows, currentUser: currentUser }, status: Success });
    } catch (err) {
      res.status(Bad).json({ message: err.message, status: Bad });
    }
  },
  Get_Room_Messages: async (req, res) => {
    try {
      const member_response = await GetRoomMembers({
        room_id: req.query.room_id,
      });
      const response = await GetRoomMessages({
        room_id: req.query.room_id,
        user_id: req.customData,
        page: req.query.page,
        messagePerPage: req.query.messagePerPage,
      });
      if (response.rows.length && member_response.rows.length) {
        response.rows.map((message, index) => {
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
          member_response.rows.map((member, indexs) => {
            if (member.id == message.sender_id) {
              message.sender_id = indexs + 1;
            }
          });
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
  Update_Message_Content: async (req, res) => {
    try {
      await UpdateMessageContent({
        message_id: req.body.message_id,
        content: req.body.content,
        user_id: req.customData,
      });

      return res.status(Success).json({ status: Success });
    } catch (err) {
      res.status(Bad).json({ message: err.message, status: Bad });
    }
  },
  Update_Message_Status: async (req, res) => {
    try {
      await UpdateMessageStatus({
        message_id: req.body.message_id,
        status: req.body.status,
        user_id: req.customData,
      });

      return res.status(Success).json({ status: Success });
    } catch (err) {
      res.status(Bad).json({ message: err.message, status: Bad });
    }
  },
  Delete_Chat_History: async (req, res) => {
    try {
      const responses = await DeleteChatHistory({ room_id: req.params.room_id, user_id: req.customData });
      if (responses.rowCount > 0) {
        return res.status(Success).json({ status: Success });
      } else {
        res.status(Bad).json({ message: Something, status: Bad });
      }
    } catch (err) {
      res.status(Bad).json({ message: err.message, status: Bad });
    }
  },
  Update_Seen_Message: async (req, res) => {
    try {
      let time = moment();
      const responses = await UpdateSeenMessage({ room_id: req.body.room_id, user_id: req.customData, id: req.body.id, timestamp: time.format() });

      return res.status(Success).json({ status: Success });
    } catch (err) {
      res.status(Bad).json({ message: err.message, status: Bad });
    }
  },
  Get_Seen_Message: async (req, res) => {
    try {
      const responses = await GetSeenMessage({ room_id: req.body.room_id, user_id: req.body.user_id });
      return res.status(Success).json({ data: responses.rows[0], status: Success });
    } catch (err) {
      res.status(Bad).json({ message: err.message, status: Bad });
    }
  },
};
