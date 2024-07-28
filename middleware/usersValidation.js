const commonController = require("../controllers/comman.controller");
const { HttpStatus, Messages } = require("../shared/constant");
const { dbValidationForDuplicate } = require("../helpers/dbValidations");

module.exports = {
  validateUserEmail: async (req, res, next) => {
    const { email } = req.body;
    try {
      const status = await dbValidationForDuplicate(email, "tbl_users", "email");
      if (status === HttpStatus.BAD_REQUEST) {
        return commonController.errorResponse(res, "Not a valid Email", HttpStatus.BAD_REQUEST);
      } else if (status === HttpStatus.ALREADY_EXISTS) {
        return commonController.errorResponse(res, `${email} is already exists! Please use diffrent email for registation.`, HttpStatus.NOT_FOUND);
      }
      next();
    } catch (error) {
      return commonController.handleAsyncError(error, res);
    }
  },
};
