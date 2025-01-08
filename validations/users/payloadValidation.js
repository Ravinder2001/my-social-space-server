const Joi = require("joi");
const { VARIABLES } = require("../../utils/constant/constant");

module.exports = {
  registerUser: Joi.object().keys({
    email: Joi.string().email().required().messages({
      "string.base": "Email must be a string",
      "string.email": "Email must be a  valid email address",
      "any.required": "Email is required",
    }),

    password: Joi.string().min(8).max(50).pattern(new RegExp(VARIABLES.REGEX)).required().messages({
      "string.base": "Password must be a string",
      "string.min": "Password must be at least 8 characters long",
      "string.max": "Password must be at most 50 characters long",
      "string.pattern.base": "Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character",
      "any.required": "Password is required",
    }),

    full_name: Joi.string().min(1).max(100).required().messages({
      "string.base": "Full name must be a string",
      "string.min": "Full name must not be empty",
      "string.max": "Full name must be at most 100 characters long",
      "any.required": "Full name is required",
    }),

    gender: Joi.string().valid("M", "F", "O").messages({
      "string.base": "Gender must be a string",
      "any.only": "Gender must be one of 'Male', 'Female', or 'Other'",
    }),
  }),
  loginUser: Joi.object().keys({
    email: Joi.string().email().required().messages({
      "string.base": "Email must be a string",
      "string.email": "Email must be a valid email address",
      "any.required": "Email is required",
    }),
    password: Joi.string().min(8).max(50).pattern(new RegExp(VARIABLES.REGEX)).required().messages({
      "string.base": "Password must be a string",
      "string.min": "Password must be at least 8 characters long",
      "string.max": "Password must be at most 50 characters long",
      "string.pattern.base": "Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character",
      "any.required": "Password is required",
    }),
  }),
  googleLogin: Joi.object().keys({
    token: Joi.string().required().messages({
      "string.base": "Token must be a string",
      "any.required": "Token is required",
    }),
  }),
};
