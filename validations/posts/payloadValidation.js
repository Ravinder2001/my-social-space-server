const Joi = require("joi");

module.exports = {
  createPostSchema: Joi.object()
    .keys({
      caption: Joi.string().allow("").optional(),
      images: Joi.array().items(Joi.string()).optional(),
      isPostScheduled: Joi.boolean().required(),
      scheduledDateTime: Joi.date()
        .optional()
        .when("isPostScheduled", {
          is: true,
          then: Joi.required().messages({
            "any.required": "Scheduled date and time are required when the post is scheduled.",
          }),
        }),
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
