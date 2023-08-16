const Joi = require("joi");
const { Image_Size } = require("../../../utils/constant");

const validator = (schema) => (payload) => {
  return schema.validate(payload, { abortEarly: false });
};

const register_user_token = Joi.object({
  token: Joi.string().required(),
  password: Joi.string().min(8).max(20).required(),
});
const register_user = Joi.object({
  name: Joi.string().max(100).required(),
  email: Joi.string().email().max(255).required(),
  password: Joi.string().min(8).max(20).required(),
});
const login_user = Joi.object({
  email: Joi.string().email().max(255).required(),
  password: Joi.string().min(8).max(20).required(),
  rememberMe: Joi.boolean(),
});
const login_user_token = Joi.object({
  token: Joi.string().required(),
});

const profile_Picture_Body = Joi.object({
  fieldname: Joi.string().required(),
  originalname: Joi.string().required(),
  encoding: Joi.string().required(),
  mimetype: Joi.string().required(),
  buffer: Joi.binary().required(),
  size: Joi.number()
    .max(Image_Size * 1024 * 1024)
    .required(),
});

exports.validate_register_user_token = validator(register_user_token);
exports.validate_register_user = validator(register_user);
exports.validate_login_user = validator(login_user);
exports.validate_login_user_token = validator(login_user_token);
exports.validate_profile_Picture_Body = validator(profile_Picture_Body);
