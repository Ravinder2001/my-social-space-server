const postModel = require("../model/posts.model");
const common = require("./common.controller");
const { HttpStatus } = require("../utils/constant/constant");
const Messages = require("../utils/constant/messages");

module.exports = {
  getAllPosts: async (req, res) => {
    try {
      let postData = await postModel.getAllPosts(req.user.user_id);
      return common.successResponse(res, Messages.SUCCESS, HttpStatus.OK, postData);
    } catch (error) {
      common.handleAsyncError(error, res);
    }
  },
  createPost: async (req, res) => {
    try {
      await postModel.createPost({ ...req.body, user_id: req.user.user_id });
      return common.successResponse(res, Messages.SUCCESS, HttpStatus.OK);
    } catch (error) {
      common.handleAsyncError(error, res);
    }
  },
};
