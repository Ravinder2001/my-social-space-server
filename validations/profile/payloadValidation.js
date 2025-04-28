const Joi = require("joi");

module.exports = {
  editProfileDetails: Joi.object({
    full_name: Joi.string().min(1).max(100).optional(),
    username: Joi.string().min(1).max(100).optional(),
    profile_picture: Joi.string().optional(),
    cover_picture: Joi.string().optional(),
    bio: Joi.string().max(100).optional(),
    city: Joi.string().max(100).optional(),
    website: Joi.string().max(100).optional(),
  }),
  validateUsername: Joi.object({
    username: Joi.string().min(1).max(100).required(),
  }),
};
