const Joi = require("joi");

module.exports = {
  createPostSchema: Joi.object()
    .keys({
      caption: Joi.string().allow("").optional(),
      images: Joi.array().items(Joi.string()).optional(),
      isPostScheduled: Joi.boolean().required(),
      scheduledDateTime: Joi.string()
        .optional()
        .when("isPostScheduled", {
          is: true,
          then: Joi.required().messages({
            "any.required": "Scheduled date and time are required when the post is scheduled.",
          }),
        }),
      tags: Joi.array().items(Joi.number()).optional(),
      post_visibility: Joi.string().valid("public", "private", "friends").required(),
      allow_comments: Joi.boolean().required(),
      allow_likes: Joi.boolean().required(),
    })
    .or("caption", "images") // At least one of caption or images must be present
    .custom((value, helpers) => {
      if (!value.caption && (!value.images || value.images.length === 0)) {
        return helpers.error("any.invalid", {
          message: "At least one of caption or images must have a value.",
        });
      }
      return value;
    }, "Custom validation for at least one value"),
};
