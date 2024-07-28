const Config = require("../../configuration/config.js");

module.exports = {
  TIME_FORMAT: {
    STANDARD_TIME_FORMAT: "YYYY-MM-DD HH:mm:ss",
  },
  HttpStatus: {
    OK: 200,
    ACCEPTED: 202,
    NO_CONTENT: 204,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    ALREADY_EXISTS: 403,
    NOT_FOUND: 404,
    CONFLICT: 409,
    INTERNAL_SERVER_ERROR: 500,
  },

  TIME: {
    expiry_time: 10, //Minutes
  },
  Messages: {
    LOGIN_SUCCESSFUL: "User Login Sucessfully.",
    INTERNAL_SERVER_ERROR: "Internal server error.",
    INVALID_ARGUMENT: "Invalid Arguments",
    ALREADY_LOGIN: "You are already login for today.",
    LOG_IN: "Successfully Login for today.",
    FORGOT_LOG_IN: "You have not login today",
    LOG_OUT: "Successfully Logout for today.",
  },
};
