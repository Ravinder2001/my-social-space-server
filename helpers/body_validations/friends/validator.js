const { Bad } = require("../../../utils/constant");
const { Something } = require("../../../utils/message");
const { validate_add_friend_body } = require("./validation");

module.exports = {
  Friends_Validations: {
    AddFriendsBody: (req, res, next) => {
      const { error } = validate_add_friend_body(req.body);
      if (error) {
        return res
          .status(Bad)
          .json({ message: error.details[0].message, status: Bad });
      } else if (req.customData != req.body.user_id) {
        return next();
      } else {
        return res.status(Bad).json({ message: Something, status: Bad });
      }
    },
  },
};
