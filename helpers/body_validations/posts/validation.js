const Joi = require("joi");

const validator = (schema) => (payload) => {
  return schema.validate(payload, { abortEarly: false });
};

const post_file = Joi.array()
  .items({
    caption: Joi.string().max(255),
    fieldname: Joi.string().required(),
    originalname: Joi.string().required(),
    encoding: Joi.string().required(),
    mimetype: Joi.string().required(),
    buffer: Joi.binary().required(),
    size: Joi.number()
      .max(1024 * 1024)
      .required(),
  })
  .max(10)
  .required();
const post_body = Joi.object({
  caption: Joi.string().min(0).max(255).required(),
});

exports.validate_post_file = validator(post_file);
exports.validate_post_body = validator(post_body);
