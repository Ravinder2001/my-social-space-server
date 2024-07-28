const commonController = require("../controllers/comman.controller");
const { HttpStatus, Messages } = require("../shared/constant");
const { dbValidationForDuplicate, dbValidation } = require("../helpers/dbValidations");
const { compareStrings } = require("../helpers/bcrypt");

module.exports = {
  validateDuplicateEmail: async (req, res, next) => {
    const { email } = req.body;
    try {
      const response = await dbValidationForDuplicate(email, "tbl_users", "email");
      if (response.status === HttpStatus.ALREADY_EXISTS) {
        return commonController.errorResponse(res, `${email} is already exists! Please use diffrent email for registation.`, HttpStatus.NOT_FOUND);
      }
      next();
    } catch (error) {
      return commonController.handleAsyncError(error, res);
    }
  },
  validateEmail: async (req, res, next) => {
    const { email } = req.body;
    try {
      const response = await dbValidation(email, "tbl_users", "email");
      if (response.status === HttpStatus.NOT_FOUND) {
        return commonController.errorResponse(res, `No User Found with this email id.`, HttpStatus.NOT_FOUND);
      } else if (!response.result.status) {
        return commonController.errorResponse(res, `Your account has been deactivated!`, HttpStatus.NOT_FOUND);
      }
      next();
    } catch (error) {
      return commonController.handleAsyncError(error, res);
    }
  },
  validatePassword: async (req, res, next) => {
    const { email, password } = req.body;
    try {
      const response = await dbValidation(email, "tbl_users", "email");
      if (!response.status === HttpStatus.NOT_FOUND) {
        return commonController.errorResponse(res, `No User Found with this email id.`, HttpStatus.NOT_FOUND);
      }
      const passwordRes = await compareStrings(password, response.result.password);

      if (!passwordRes) {
        return commonController.errorResponse(res, Messages.INVALID_PASSWORD, HttpStatus.UNAUTHORIZED);
      }
      next();
    } catch (error) {
      return commonController.handleAsyncError(error, res);
    }
  },
};
