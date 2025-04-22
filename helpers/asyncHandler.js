const common = require("../controller/common.controller");
const asyncHandler = (fn) => async (req, res, next) => {
  try {
    const result = await fn(req, res, next);
    return common.successResponse(res, result.message || "Operation successful", result.status || 200, result.data);
  } catch (error) {
    return common.handleAsyncError(error, res);
  }
};

module.exports = asyncHandler;
