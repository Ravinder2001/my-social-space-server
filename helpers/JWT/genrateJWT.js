const jwt = require("jsonwebtoken");
const config = require("../../utils/config");

const genrateJWT = (data, customExpires) => {
  const token = jwt.sign(data, config.jwt_secret_key, {
    expiresIn: customExpires
      ? config.cusotm_jwt_expires_in
      : config.jwt_expires_in,
  });
  return token;
};
module.exports = genrateJWT;
