const config = require("../configuration/config");
const jwt = require("jsonwebtoken");
const decodeJWT = (token) => {
  try {
    const decoded = jwt.verify(token, config.jwt.secretKey);
    return decoded;
  } catch (error) {
    return null;
  }
};

module.exports = decodeJWT;
