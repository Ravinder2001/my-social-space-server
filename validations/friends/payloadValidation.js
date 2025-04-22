const Joi = require("joi");

module.exports = {
  sendFriendRequest: Joi.object({
    receiver_id: Joi.number().integer().positive().required(),
  }),

  respondFriendRequest: Joi.object({
    status: Joi.string().valid("ACCEPTED", "REJECTED").required(),
  }),

  followUser: Joi.object({
    followed_id: Joi.number().integer().positive().required(),
  }),
};
