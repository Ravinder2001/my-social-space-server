const { HttpStatus } = require("../shared/constant");
const common = require("./comman.controller");
const userModel = require("../models/users.model");
const { hashString } = require("../helpers/bcrypt");

module.exports = {
  register: async (req, res) => {
    try {
      const password = req.body.password;
      const hashedPassword = await hashString(password);
      const userRes = await userModel.register({ ...req.body, password: hashedPassword });
      let tokenData = {
        id: userRes.id,
        email: userRes.email,
        first_name: userRes.first_name,
      };
      const token = common.generateToken(tokenData);
      return common.successResponse(res, "success", HttpStatus.OK, token);
    } catch (error) {
      common.handleAsyncError(error, res);
    }
  },
};
