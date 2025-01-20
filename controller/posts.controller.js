const postModel = require("../model/posts.model");
const common = require("./common.controller");
const { HttpStatus, VARIABLES } = require("../utils/constant/constant");
const Messages = require("../utils/constant/messages");
const { generateImageLink } = require("../utils/common/common");

module.exports = {
  getAllPosts: async (req, res) => {
    try {
      let postData = await postModel.getAllPosts({ user_id: req.user.user_id, limit: req.query.limit ?? VARIABLES.TOTAL_POSTS_PER_PAGE, offset: req.query.page ?? 0 });
      postData = await Promise.all(postData.map(async (post) => {
        post.images = await Promise.all(post.images.map(async (image) => {
          image = await generateImageLink(image);
          return image;
        }));
        return post;
      }));
      return common.successResponse(res, Messages.SUCCESS, HttpStatus.OK, postData, postData.length);
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
