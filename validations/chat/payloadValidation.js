const Joi = require("joi");

module.exports = {
  createChannel: Joi.object({
    is_group: Joi.boolean().default(false),
    name: Joi.string().allow(null, "").when("is_group", {
      is: true,
      then: Joi.string().required(),
    }),
    user_ids: Joi.array().items(Joi.number().integer()).min(1).required(),
  }),
  addParticipantsToChannel: Joi.object({
    channel_id: Joi.number().integer().required(),
    user_ids: Joi.array().items(Joi.number().integer()).min(1).required(),
  }),
  sendMessage: Joi.object({
    channel_id: Joi.number().integer().required(),
    message: Joi.string().required(),
    content_type: Joi.string().valid("TEXT", "IMAGE", "VIDEO").required(),
  }),
  markAsSeen: Joi.object({
    channel_id: Joi.number().integer().required(),
    seen_at: Joi.date().iso().optional(), // Optional: server can use current timestamp
  }),
  isTypingSocket: Joi.object({
    channel_id: Joi.number().integer().required(),
  }),
  editMessage: Joi.object({
    message: Joi.string().required().messages({
      "string.base": "Message must be a string",
      "any.required": "New message content is required",
    }),
  }),
};
