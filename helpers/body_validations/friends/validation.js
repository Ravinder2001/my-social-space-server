const Joi = require("joi");

const validator = (schema) => (payload) => {
  return schema.validate(payload, { abortEarly: false });
};

const add_friend_body = Joi.object({
  user_id: Joi.string().max(255).required()
});

exports.validate_add_friend_body = validator(add_friend_body);
