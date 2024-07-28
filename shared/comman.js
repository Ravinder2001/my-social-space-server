const config = require("../configuration/config");
const jwt = require("jsonwebtoken");
const moment = require("moment");

/**
 * Generates a timestamp in Asia/Kolkata timezone.
 * @param {string} format - The desired date-time format.
 * @returns {string} - The formatted timestamp.
 */
function generateTimestamp(format = "YYYY-MM-DD HH:mm:ss") {
  return moment().utcOffset("+05:30").format(format);
}

const decodeJWT = (token) => {
  try {
    const decoded = jwt.verify(token, config.jwt.secretKey);
    return decoded;
  } catch (error) {
    return null;
  }
};

module.exports = {
  decodeJWT,
  generateTimestamp,
};
