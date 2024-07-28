const { Messages, HttpStatus } = require("../../shared/constant");
const common = require("../../controller/common.controller");

const validateBody = (schema) => {
  return (req, res, next) => {
    try {
      const { error, value } = schema.validate(req.body, {
        abortEarly: false,
        convert: false,
      });
      if (error) {
        let err_msg = {};
        for (let counter in error.details) {
          let k = error.details[counter].context.key || "key";
          let val = error.details[counter].message;
          err_msg[k] = val;
        }
        return common.errorResponse(res, err_msg, HttpStatus.BAD_REQUEST);
      }
      if (!req.value) {
        req.value = {};
      }
      req.value["body"] = value;
      next();
    } catch (error) {
      // common.logError(error);
      return common.errorResponse(
        res,
        Messages.INTERNAL_SERVER_ERROR,
        HttpStatus.BAD_REQUEST
      );
    }
  };
};
module.exports = validateBody;
