const handlePassportError = require("./errors/handlePassportError");
const authenticateStaffJWT = require("./middleware/authenticateStaffJWT");
const authenticateSuperAdminJWT = require("./middleware/authenticateSuperAdminJWT");
const authenticateGuestJWT = require("./middleware/authenticateGuestJWT");

module.exports = {
  handlePassportError,
  authenticateStaffJWT,
  authenticateSuperAdminJWT,
  authenticateGuestJWT,
};
