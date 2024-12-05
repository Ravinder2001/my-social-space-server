const userModel = require("../model/users.model");
const common = require("./common.controller");
const { HttpStatus } = require("../utils/constant/constant");
const Messages = require("../utils/constant/messages");
const { hashPassword } = require("../utils/common/common");

module.exports = {
  register: async (req, res) => {
    try {
      let hashedPassword = await hashPassword(req.body.password);

      const response = await userModel.register({ ...req.body, password: hashedPassword });

      const token = await common.generateUserToken(response);

      return common.successResponse(res, Messages.LOGIN_SUCCESS, HttpStatus.OK, {
        token,
      });
    } catch (error) {
      common.handleAsyncError(error, res);
    }
  },
  login: async (req, res) => {
    try {
      const { email } = req.body;
      const user = await userModel.getUserDetailsByEmail(email);

      if (!user) {
        return res.status(401).json({ error: Messages.INVALID_CREDS, status: 401 });
      }

      const token = await common.generateUserToken(user);

      return common.successResponse(res, Messages.LOGIN_SUCCESS, HttpStatus.OK, {
        token,
      });
    } catch (error) {
      common.handleAsyncError(error, res);
    }
  },
};
