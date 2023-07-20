const { Unauthorized } = require("../../utils/constant");
const { UnauthorizedMsg } = require("../../utils/message");

const authentication = async (req, res, next) => {
  try {
    let token = req.headers.authorization;
    if (token) {
        token = token.split(" ")[1];
        const decoded = jwt.verify(token)
        console.log("🚀  file: authentication.js:10  decoded:", decoded)
    }
    res
      .status(Unauthorized)
      .json({ message: UnauthorizedMsg, status: Unauthorized });
  } catch (err) {
    res
      .status(Unauthorized)
      .json({ message: err.message, status: Unauthorized });
  }
};

module.exports = authentication;
