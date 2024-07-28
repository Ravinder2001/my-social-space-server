const Joi = require("joi");

module.exports = {
  registerPayloadValidation: Joi.object({
    first_name: Joi.string().required(),
    last_name: Joi.string(),
    email: Joi.string().email().required(),
    password: Joi.string().required().min(6).max(20),
  }),
};
