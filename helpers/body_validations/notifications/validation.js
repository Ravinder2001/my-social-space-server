const Joi = require("joi");
const { Image_Size } = require("../../../utils/constant");

const validator = (schema) => (payload) => {
  return schema.validate(payload, { abortEarly: false });
};

const create_body = Joi.object({
  user_id: Joi.string().required(),
  notification_type: Joi.string().required(),
  message: Joi.string().required(),
});

exports.validate_create_body = validator(create_body);
