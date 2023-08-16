const { FindPostById } = require("../../models/post.modal");
const { LoginUser, FindUserById } = require("../../models/users.model");
const { Bad } = require("../../utils/constant");
const {
  UserExists,
  UserIdNotFound,
  PostIdNotFound,
} = require("../../utils/message");

module.exports = {
  PostIdValidation: async (req, res, next) => {
    try {
      const response = await FindPostById({ id: req.params.post_id });
      if (response.rows.length) {
        return next();
      }
      return res.status(Bad).json({ message: PostIdNotFound, status: Bad });
    } catch (err) {
      return res.status(Bad).json({ message: err.message, status: Bad });
    }
  },
};
