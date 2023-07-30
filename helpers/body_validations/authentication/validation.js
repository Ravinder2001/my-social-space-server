const Joi = require("joi");

const validator = (schema) => (payload) => {
  return schema.validate(payload, { abortEarly: false });
};

const register_user_token = Joi.object({
  token: Joi.string().required(),
  password: Joi.string().min(8).max(20).required(),
});
const register_user = Joi.object({
  name: Joi.string().max(255).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).max(20).required(),
});
const login_user = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).max(20).required(),
  rememberMe: Joi.boolean(),
});
const login_user_token = Joi.object({
  token: Joi.string().required(),
});

exports.validate_register_user_token = validator(register_user_token);
exports.validate_register_user = validator(register_user);
exports.validate_login_user = validator(login_user);
exports.validate_login_user_token = validator(login_user_token);
