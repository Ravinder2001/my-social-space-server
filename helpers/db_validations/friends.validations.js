const { FindUserById } = require("../../models/users.model");
const { Bad } = require("../../utils/constant");
const { UserIdNotFound } = require("../../utils/message");

module.exports = {
  FriendIdValidation: async (req, res, next) => {
    try {
      const response = await FindUserById({ id: req.body.user_id });
      if (response.rows.length) {
        return next();
      }
      return res.status(Bad).json({ message: UserIdNotFound, status: Bad });
    } catch (err) {
      return res.status(Bad).json({ message: err.message, status: Bad });
    }
  },
};
