const { Bad } = require("../../../utils/constant");
const { Something } = require("../../../utils/message");
const { validate_room_body, validate_message_body } = require("./validation");

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
  },
};
