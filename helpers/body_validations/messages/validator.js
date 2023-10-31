const { Bad } = require("../../../utils/constant");
const { Something } = require("../../../utils/message");
const { validate_room_body, validate_message_body, validate_updateMessageContent, validate_updateMessageStatus, validate_updateSeenMsg, validate_getSeenMsg } = require("./validation");

module.exports = {
  Messages_Validations: {
    CreateRoom: (req, res, next) => {
      const { error } = validate_room_body(req.body);
      if (error) {
        return res
          .status(Bad)
          .json({ message: error.details[0].message, status: Bad });
      }
      return next();
    },
    SendMessage: (req, res, next) => {
      const { error } = validate_message_body(req.body);
      if (error) {
        return res
          .status(Bad)
          .json({ message: error.details[0].message, status: Bad });
      }
      return next();
    },
    UpdateMessageContent: (req, res, next) => {
      const { error } = validate_updateMessageContent(req.body);
      if (error) {
        return res
          .status(Bad)
          .json({ message: error.details[0].message, status: Bad });
      }
      return next();
    },
    UpdateMessageStatus: (req, res, next) => {
      const { error } = validate_updateMessageStatus(req.body);
      if (error) {
        return res
          .status(Bad)
          .json({ message: error.details[0].message, status: Bad });
      }
      return next();
    },
    UpdateMessageSeen: (req, res, next) => {
      const { error } = validate_updateSeenMsg(req.body);
      if (error) {
        return res
          .status(Bad)
          .json({ message: error.details[0].message, status: Bad });
      }
      return next();
    },
    GetMessageSeen: (req, res, next) => {
      const { error } = validate_getSeenMsg(req.body);
      if (error) {
        return res
          .status(Bad)
          .json({ message: error.details[0].message, status: Bad });
      }
      return next();
    },
  },
};
