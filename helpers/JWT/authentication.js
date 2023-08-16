const { FindUserById } = require("../../models/users.model");
const { jwt_secret_key } = require("../../utils/config");
const { Unauthorized } = require("../../utils/constant");
const { UnauthorizedMsg } = require("../../utils/message");
const jwt = require("jsonwebtoken");

const authentication = async (req, res, next) => {
  try {
    let token = req.headers.authorization;
    if (token) {
      token = token.split(" ")[1];
      const decoded = jwt.verify(token, jwt_secret_key);

      const response = await FindUserById({ id: decoded.id });
      if (response.rows.length) {
        req.customData = decoded.id;
        return next();
      } else {
        return res
          .status(Unauthorized)
          .json({ message: UnauthorizedMsg, status: Unauthorized });
      }
    }
    return res
      .status(Unauthorized)
      .json({ message: UnauthorizedMsg, status: Unauthorized });
  } catch (err) {
    return res
      .status(Unauthorized)
      .json({ message: err.message, status: Unauthorized });
  }
};

module.exports = authentication;
