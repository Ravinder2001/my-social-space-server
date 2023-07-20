const { LoginUser } = require("../../models/users.model");
const { Bad } = require("../../utils/constant");
const { UserExists } = require("../../utils/message");

module.exports = {
  UserValidations: async (req, res, next) => {
    const response = await LoginUser({
      email: req?.customData?.email ?? req.body.email,
    });
    if (response.rows.length) {
      return res.status(Bad).json({ message: UserExists, status: Bad });
    }
    next();
  },
};
