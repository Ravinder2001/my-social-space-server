const userModel = require("../model/users.model");
const common = require("./common.controller");
const { HttpStatus } = require("../utils/constant/constant");
const Messages = require("../utils/constant/messages");
const { hashPassword } = require("../utils/common/common");
const generateUniqueUsername = require("../helpers/generateUsername");
const { OAuth2Client } = require("google-auth-library");
const config = require("../configuration/config");

const client = new OAuth2Client(config.google.google_client_id);

module.exports = {
  register: async (req, res) => {
    try {
      // Generate a unique username
      let username = await generateUniqueUsername(req.body.full_name);

      let hashedPassword = await hashPassword(req.body.password);

      await userModel.register({ ...req.body, password: hashedPassword, username: username });

      return common.successResponse(res, Messages.USER_REGISTER_SUCCESS, HttpStatus.OK);
    } catch (error) {
      common.handleAsyncError(error, res);
    }
  },
  login: async (req, res) => {
    try {
      const { email } = req.body;
      const user = await userModel.getUserDetailsByEmail(email);

      if (!user) {
        return res.status(401).json({ message: Messages.INVALID_CREDS, success: 0 });
      }

      const token = await common.generateUserToken(user);

      return common.successResponse(res, Messages.LOGIN_SUCCESS, HttpStatus.OK, {
        token,
      });
    } catch (error) {
      common.handleAsyncError(error, res);
    }
  },
  googleLogin: async (req, res) => {
    try {
      const id_token = req.body.token;

      const ticket = await client.verifyIdToken({
        idToken: id_token,
        audience: process.env.GOOGLE_CLIENT_ID,
      });
      const payload = ticket.getPayload();
      const email = payload.email;

      const user = await userModel.getUserDetailsByEmail(email);

      if (!user) {
        return res.status(401).json({ message: Messages.USER_NOT_FOUND, success: 0 });
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
