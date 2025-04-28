const commonController = require("../controller/common.controller");
// const dbValidation = require("../utils/common/validation/dbValidation");
const { HttpStatus } = require("../utils/constant/constant");
const Messages = require("../utils/constant/messages");
const dbValidationForDuplicate = require("../utils/common/validation/dbValidationForDuplicate");

module.exports = {
  validateUsername: async (req, res, next) => {
    const { username } = req.body;

    try {
      if (username) {
        const status = await dbValidationForDuplicate(username, "tbl_users", "username", `user_id != ${req.user.user_id}`);
        if (status === HttpStatus.BAD_REQUEST) {
          return commonController.errorResponse(res, Messages.INVALID_PAYLOAD, HttpStatus.BAD_REQUEST);
        } else if (status === HttpStatus.ALREADY_EXISTS) {
          return commonController.errorResponse(res, Messages.ALREADY_EXISTS(username, "Username"), HttpStatus.ALREADY_EXISTS);
        }
      }
      next();
    } catch (error) {
      return commonController.handleAsyncError(error, res);
    }
  },
};
