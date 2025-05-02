const Joi = require("joi");

module.exports = {
  createStory: Joi.object({
    media_url: Joi.string().required().messages({
      "string.base": "Media URL must be a string",
      "any.required": "Media URL is required",
    }),

    media_type: Joi.string().valid("IMAGE", "VIDEO").required().messages({
      "any.only": "Media type must be either IMAGE or VIDEO",
      "any.required": "Media type is required",
    }),

    song_name: Joi.string().allow(null, "").max(255).messages({
      "string.base": "Song name must be a string",
      "string.max": "Song name can't be more than 255 characters",
    }),

    song_start_time: Joi.number().allow(null).min(0).messages({
      "number.base": "Song start time must be a number",
      "number.min": "Song start time cannot be negative",
    }),

    song_end_time: Joi.number().allow(null).min(0).greater(Joi.ref("song_start_time")).messages({
      "number.base": "Song end time must be a number",
      "number.greater": "Song end time must be greater than song start time",
      "number.min": "Song end time cannot be negative",
    }),
  }),
};
