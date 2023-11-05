const Joi = require("joi");
const { Image_Size } = require("../../../utils/constant");

const validator = (schema) => (payload) => {
  return schema.validate(payload, { abortEarly: false });
};

const add_story = Joi.object({
  fieldname: Joi.string().required(),
  originalname: Joi.string().required(),
  encoding: Joi.string().required(),
  mimetype: Joi.string().required(),
  buffer: Joi.binary().required(),
  size: Joi.number()
    .max(Image_Size * 1024 * 1024)
    .required(),
});

exports.validate_add_story = validator(add_story);
