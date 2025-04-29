const postModel = require("../model/posts.model");
const asyncHandler = require("../helpers/asyncHandler");
const { CaptionGenerator } = require("../helpers/chatgptHelper");
const { generatePreSignedURL } = require("../utils/common/imageUploadToS3");
const { createNotification } = require("../model/notification.model");

module.exports = {
  createPost: asyncHandler(async (req) => {
    await postModel.createPost({ ...req.body, user_id: req.user.user_id });

    return {
      message: "Post created successfully",
      status: 201,
    };
  }),
  generateCaption: asyncHandler(async (req) => {
    const AICaption = await CaptionGenerator(req.body.prompt);

    return {
      message: "Post created successfully",
      data: AICaption,
      status: 201,
    };
  }),

  deletePost: asyncHandler(async (req) => {
    const { post_id } = req.params;
    const result = await postModel.deletePost(post_id, req.user.user_id);
    return {
      message: result.message,
      data: { post_id: result.post_id },
      status: 200,
    };
  }),

  editPost: asyncHandler(async (req) => {
    const { post_id } = req.params;
    await postModel.editPost({
      post_id,
      user_id: req.user.user_id,
      ...req.body,
    });
    return {
      message: "Post updated successfully",
      status: 200,
    };
  }),

  toggleLike: asyncHandler(async (req) => {
    const { post_id } = req.params;
    const result = await postModel.toggleLike(post_id, req.user.user_id);

    if (result.isLiked && result.post_admin_id != req.user.user_id) {
      await createNotification({
        user_id: result.post_admin_id,
        type: "LIKE",
        post_id,
      });
    }

    return {
      message: result.message,
      status: 200,
    };
  }),

  addComment: asyncHandler(async (req) => {
    const { post_id } = req.params;
    const cmtData = await postModel.addComment({
      post_id,
      user_id: req.user.user_id,
      ...req.body,
    });

    if (cmtData.post_admin_id != req.user.user_id) {
      await createNotification({
        user_id: cmtData.post_admin_id,
        type: "COMMENT",
        post_id,
        details: {
          user_id: req.user.user_id,
        },
      });
    }
    return {
      message: "Comment added successfully",
      status: 201,
      data: cmtData,
    };
  }),

  removeComment: asyncHandler(async (req) => {
    const { comment_id } = req.params;
    await postModel.removeComment(comment_id, req.user.user_id);
    return {
      message: "Comment removed Succesfully",
      status: 200,
    };
  }),

  getPost: asyncHandler(async (req) => {
    const { post_id } = req.params;
    const post = await postModel.getPost(post_id);
    return {
      message: "Post retrieved successfully",
      data: post,
      status: 200,
    };
  }),
  getAllPosts: asyncHandler(async (req) => {
    const posts = await postModel.getAllPosts(req.user.user_id);

    const updatedPosts = await Promise.all(
      posts.map(async (post) => {
        // Replace user's profile_picture with signed URL
        if (post.profile_picture) {
          post.profile_picture = await generatePreSignedURL(post.profile_picture);
        }

        // Replace each image in the array with signed URLs
        post.images = await Promise.all(post.images.map((imgPath) => generatePreSignedURL(imgPath)));

        // If there's a latest_comment, update its profile_picture too
        if (post.latest_comment && post.latest_comment.profile_picture) {
          post.latest_comment.profile_picture = await generatePreSignedURL(post.latest_comment.profile_picture);
        }

        if (post.user_id == req.user.user_id) {
          post.ownPost = true;
        }

        delete post.user_id;
        return post;
      })
    );

    return {
      message: "Post retrieved successfully",
      data: updatedPosts,
      status: 200,
    };
  }),

  getComments: asyncHandler(async (req) => {
    const comments = await postModel.getComments(req.params.post_id);
    const updatedPosts = await Promise.all(
      comments.map(async (post) => {
        if (post.profile_picture) {
          post.profile_picture = await generatePreSignedURL(post.profile_picture);
        }
        return post;
      })
    );
    return {
      message: "Comments retrieved successfully",
      data: updatedPosts,
      status: 200,
    };
  }),

  toggleSave: asyncHandler(async (req) => {
    const { post_id } = req.params;
    const result = await postModel.toggleSave(post_id, req.user.user_id);
    return {
      message: result.message,
      status: 200,
    };
  }),
};
