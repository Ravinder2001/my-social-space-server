const { Bad, Image_Size } = require("../../../utils/constant");
const { NoFile, ImageSizeError } = require("../../../utils/message");
const {
  validate_register_user_token,
  validate_register_user,
  validate_login_user,
  validate_login_user_token,
  validate_profile_Picture_Body,
} = require("./validation");

module.exports = {
  User_Validations: {
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
    ProfilePicture: (req, res, next) => {
      if (!req.file) {
        return res.status(Bad).json({ message: NoFile, status: Bad });
      }
      if (req.file.size > Image_Size * 1024 * 1024) {
        return res.status(Bad).json({ message: ImageSizeError, status: Bad });
      }
      const { error } = validate_profile_Picture_Body(req.file);
      if (error)
        return res
          .status(Bad)
          .json({ message: error.details[0].message, status: Bad });
      return next();
    },
  },
};
