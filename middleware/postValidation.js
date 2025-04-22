const commonController = require("../controller/common.controller");
const dbValidation = require("../utils/common/validation/dbValidation");
const { HttpStatus } = require("../utils/constant/constant");
const PostModel = require("../model/posts.model");
const Messages = require("../utils/constant/messages");

module.exports = {
  validatePostId: async (req, res, next) => {
    const { post_id } = req.params;

    try {
      const status = await dbValidation(post_id, "tbl_posts", "post_id");
      if (status === HttpStatus.BAD_REQUEST) {
        return commonController.errorResponse(res, "Not a valid Group id", HttpStatus.BAD_REQUEST);
      } else if (status === HttpStatus.NOT_FOUND) {
        return commonController.errorResponse(res, `Group not found with the id ${post_id}`, HttpStatus.NOT_FOUND);
      }
      next();
    } catch (error) {
      return commonController.handleAsyncError(error, res);
    }
  },
  validatePostOwnership: async (req, res, next) => {
    const { post_id } = req.params;

    try {
      const groupData = await PostModel.getPost(post_id);
      if (groupData.user_id != req.user.user_id) {
        return commonController.errorResponse(res, Messages.FORBIDDEN, HttpStatus.BAD_REQUEST);
      }
      next();
    } catch (error) {
      return commonController.handleAsyncError(error, res);
    }
  },
};
