const { Bad } = require("../../../utils/constant");
const { validate_register_user_token,validate_register_user, validate_login_user, validate_login_user_token } = require("./validation");

module.exports = {
  Body_Validations: {
    RegisterUserToken: (req, res, next) => {
      const { error } = validate_register_user_token(req.body);
      if (error)
        return res
          .status(Bad)
          .json({ message: error.details[0].message, status: Bad });
      return next();
    },
    RegisterUser: (req, res, next) => {
      const { error } = validate_register_user(req.body);
      if (error)
        return res
          .status(Bad)
          .json({ message: error.details[0].message, status: Bad });
      return next();
    },
    LoginUser: (req, res, next) => {
      const { error } = validate_login_user(req.body);
      if (error)
        return res
          .status(Bad)
          .json({ message: error.details[0].message, status: Bad });
      return next();
    },
    LoginUserToken: (req, res, next) => {
      const { error } = validate_login_user_token(req.body);
      if (error)
        return res
          .status(Bad)
          .json({ message: error.details[0].message, status: Bad });
      return next();
    },
  },
};
