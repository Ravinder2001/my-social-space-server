const { LoginUser, FindUserById } = require("../../models/users.model");
const { Bad } = require("../../utils/constant");
const { UserExists, UserIdNotFound } = require("../../utils/message");

module.exports = {
  UserValidations: async (req, res, next) => {
    try {
      const response = await LoginUser({
        email: req?.customData?.email ?? req.body.email,
      });
      if (response.rows.length) {
        return res.status(Bad).json({ message: UserExists, status: Bad });
      }
      return next();
    } catch (err) {
      return res.status(Bad).json({ message: UserExists, status: Bad });
    }
  },
  UserIdValidation: async (req, res, next) => {
    try {
      const response = await FindUserById({ id: req.params.user_id });
      if (response.rows.length) {
        return next();
      }
      return res.status(Bad).json({ message: UserIdNotFound, status: Bad });
    } catch (err) {
      return res.status(Bad).json({ message: err.message, status: Bad });
    }
  },
};
