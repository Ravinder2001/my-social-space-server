const Joi = require("joi");

module.exports = {
  markAsRead: Joi.object({
    notification_ids: Joi.array().items(Joi.number()).min(1).required(),
  }),
};
