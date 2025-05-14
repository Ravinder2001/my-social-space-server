const Joi = require("joi");

module.exports = {
  createChannel: Joi.object({
    is_group: Joi.boolean().default(false),
    name: Joi.string().allow(null, "").when("is_group", {
      is: true,
      then: Joi.string().required(),
    }),
    user_ids: Joi.alternatives().conditional("is_group", {
      is: true,
      then: Joi.array().items(Joi.number().integer()).min(2).required(),
      otherwise: Joi.array().items(Joi.number().integer()).min(1).required(),
    }),
  }),
  addParticipantsToChannel: Joi.object({
    user_ids: Joi.array().items(Joi.number().integer()).min(1).required(),
  }),
  sendMessage: Joi.object({
    message: Joi.string().required(),
    content_type: Joi.string().valid("TEXT", "IMAGE", "VIDEO").required(),
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
  editChannelDetails: Joi.object({
    name: Joi.string().required(),
    group_logo: Joi.string().allow(null, "").required(),
  }),
};
