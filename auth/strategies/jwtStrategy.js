/**
 * Module dependencies.
 */
const passport = require("passport");
const { Strategy: JwtStrategy, ExtractJwt } = require("passport-jwt");

/**
 * Module imports.
 */
const { USER_TYPES } = require("../../utils/constant/constant");
const userAdminModel = require("../../model/staffModule/staffLogin.model");
const guestModel = require("../../model/guest/guest.model");
const userSuperAdminModel = require("../../model/superAdmin/users.model");
const config = require("../../configuration/config");
const Messages = require("../../utils/constant/messages");

/**
 * JWT options for passport-jwt strategy.
 * @type {Object}
 * @property {Function} jwtFromRequest - Function to extract JWT token from the request.
 * @property {string} secretOrKey - Secret key used to verify the JWT token.
 */
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.jwt.secretKey,
};

/**
 * Passport JWT strategy for admin authentication.
 * @param {Object} payload - Decoded JWT payload.
 * @param {Function} done - Callback function to indicate authentication success or failure.
 * @returns {Promise<void>} - Promise that resolves when authentication is complete.
 */

passport.use(
  "jwtGuest",
  new JwtStrategy(jwtOptions, async (payload, done) => {
    try {
      // Check token type for Mr or Dr or Bm;
      if (payload.role !== USER_TYPES.GUEST) {
        return done(null, false, { message: Messages.UNAUTHORIZED });
      }
      if (!payload.iss) {
        return done(null, false, { message: Messages.UNAUTHORIZED });
      }

      const user = await guestModel.validateRoomId(payload.room_id);

      if (!user) {
        return done(null, false);
      }
      return done(null, user);
    } catch (error) {
      return done(error, false);
    }
  })
);
passport.use(
  "jwtStaff",
  new JwtStrategy(jwtOptions, async (payload, done) => {
    try {
      // Check token type for Mr or Dr or Bm;
      if (payload.role !== USER_TYPES.STAFF) {
        return done(null, false, { message: Messages.UNAUTHORIZED });
      }
      if (!payload.iss) {
        return done(null, false, { message: Messages.UNAUTHORIZED });
      }

      if (payload.is_master) {
        const user = await userAdminModel.getMasterUserDetailsByID(payload.id);

        if (!user) {
          return done(null, false);
        }
        return done(null, { ...user, is_master: true });
      }

      const user = await userAdminModel.getUserDetailsById(payload.id);

      if (!user) {
        return done(null, false);
      }
      return done(null, user);
    } catch (error) {
      return done(error, false);
    }
  })
);
passport.use(
  "jwtSuperAdmin",
  new JwtStrategy(jwtOptions, async (payload, done) => {
    try {
      // Check token type for Mr or Dr or Bm;
      if (payload.role !== USER_TYPES.SUPERADMIN) {
        return done(null, false, { message: Messages.UNAUTHORIZED });
      }
      if (!payload.iss) {
        return done(null, false, { message: Messages.UNAUTHORIZED });
      }

      const user = await userSuperAdminModel.getSuperAdminDetailsById(payload.id);

      if (!user) {
        return done(null, false);
      }
      return done(null, user);
    } catch (error) {
      return done(error, false);
    }
  })
);

/**
 * Module exports.
 */
module.exports = passport;
