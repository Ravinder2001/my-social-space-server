const { Messages, HttpStatus } = require("../shared/constant");
const common = require("../../controller/common.controller");

const validateParam = (schema) => {
  return (req, res, next) => {
    try {
      const result = schema.validate(req.params);
      if (result.error) {
        return common.errorResponse(res, Messages.INVALID_ARGUMENT, HttpStatus.BAD_REQUEST);
      }

      if (!req.value) {
        req.value = {};
      }
      req.value["params"] = result.value;
      next();
    } catch (error) {
      common.logError(error);
      return common.errorResponse(res, Messages.INTERNAL_SERVER_ERROR, HttpStatus.BAD_REQUEST);
    }
  };
};
module.exports = validateParam;
