const Joi = require("joi");

const validator = (schema) => (payload) => {
  return schema.validate(payload, { abortEarly: false });
};

const room_body = Joi.object({
  type: Joi.number().required(),
  name: Joi.string()
    .max(50)
    .when("type", {
      is: Joi.number().valid(2),
      then: Joi.required(),
      otherwise: Joi.optional(),
    }),
  image_url: Joi.string()
    .max(500)
    .when("type", {
      is: Joi.number().valid(2),
      then: Joi.required(),
      otherwise: Joi.optional(),
    }),
  users: Joi.array()
    .items({
      user_id: Joi.string().required(),
      isMessageAllowed: Joi.boolean().required(),
    })
    .min(1)
    .max(10)
    .required(),
});

const message_body = Joi.object({
  room_id: Joi.string().max(255).required(),
  content: Joi.string().max(255).required(),
  content_type: Joi.string().max(10).required(),
});

exports.validate_room_body = validator(room_body);
exports.validate_message_body = validator(message_body);
