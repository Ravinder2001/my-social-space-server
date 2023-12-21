const Joi = require("joi");
const { Image_Size } = require("../../../utils/constant");

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
      .max(Image_Size * 1024 * 1024)
      .required(),
  })
  .max(10)
  .required();
const post_body = Joi.object({
  caption: Joi.string().min(0).max(255).required(),
  comment: Joi.string().min(0).max(1).required(),
  like: Joi.string().min(0).max(1).required(),
  share: Joi.string().min(0).max(1).required(),
  visibility: Joi.string().min(0).max(10).required(),
  uploadAt: Joi.string().required(),
  uploadTill: Joi.string().required(),
  image: Joi.array().items({
    caption: Joi.string().max(255),
    fieldname: Joi.string().required(),
    originalname: Joi.string().required(),
    encoding: Joi.string().required(),
    mimetype: Joi.string().required(),
    buffer: Joi.binary().required(),
    size: Joi.number()
      .max(Image_Size * 1024 * 1024)
      .required(),
  }),
});
const comment_body = Joi.object({
  content: Joi.string().max(255).required(),
});
const edit_post_body = Joi.object({
  caption: Joi.string().min(0).max(255).required(),
  comment: Joi.bool().required(),
  like: Joi.bool().required(),
  share: Joi.bool().required(),
  visibility: Joi.string().min(0).max(10).required(),
});

exports.validate_post_file = validator(post_file);
exports.validate_post_body = validator(post_body);
exports.validate_comment_body = validator(comment_body);
exports.validate_edit_post_body = validator(edit_post_body);
