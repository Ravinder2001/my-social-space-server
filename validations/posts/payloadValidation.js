const Joi = require("joi");

module.exports = {
  createPost: Joi.object({
    caption: Joi.string().max(500).required(),
    visibility: Joi.string().valid("PUBLIC", "PRIVATE", "FRIENDS").required(),
    images: Joi.array().items(Joi.string()).max(5).optional(),
  }),

  editPost: Joi.object({
    caption: Joi.string().max(500).optional(),
    visibility: Joi.string().valid("PUBLIC", "PRIVATE", "FRIENDS").optional(),
  }),

  addComment: Joi.object({
    content: Joi.string().max(500).required(),
  }),
  generateCaption: Joi.object({
    prompt: Joi.string().max(200).required(),
  }),
};
