const postModel = require("../model/profile.model");
const asyncHandler = require("../helpers/asyncHandler");
const { generatePreSignedURL } = require("../utils/common/imageUploadToS3");

module.exports = {
  getAllPosts: asyncHandler(async (req) => {
    let posts;
    if (!req.query.user_id) {
      posts = await postModel.getAllPosts(req.user.user_id);
    } else {
      posts = await postModel.getAnotherUserAllPosts(req.user.user_id, req.query.user_id);
    }
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

  getAllPhotos: asyncHandler(async (req) => {
    let posts;

    if (!req.query.user_id) {
      posts = await postModel.getAllPhotos(req.user.user_id);
    } else {
      posts = await postModel.getAnotherUserAllPhotos(req.user.user_id, req.query.user_id);
    }
    const updatedPosts = await Promise.all(
      posts.map(async (post) => {
        if (post.image) {
          post.image = await generatePreSignedURL(post.image);
        }
        return post;
      })
    );
    return {
      message: "Post retrieved successfully",
      data: updatedPosts,
      status: 200,
    };
  }),

  getAllSavedPosts: asyncHandler(async (req) => {
    const posts = await postModel.getAllSavedPosts(req.user.user_id);
    const updatedPosts = await Promise.all(
      posts.map(async (post) => {
        if (post.image) {
          post.image = await generatePreSignedURL(post.image);
        }
        return post;
      })
    );
    return {
      message: "Post retrieved successfully",
      data: updatedPosts,
      status: 200,
    };
  }),
  getProfileDetails: asyncHandler(async (req) => {
    const posts = await postModel.getProfileDetails(req.query.user_id ?? req.user.user_id);

    if (posts.profile_picture) {
      posts.profile_picture = await generatePreSignedURL(posts.profile_picture);
    }
    if (posts.cover_picture) {
      posts.cover_picture = await generatePreSignedURL(posts.cover_picture);
    }

    return {
      message: "Post retrieved successfully",
      data: posts,
      status: 200,
    };
  }),

  editProfileDetails: asyncHandler(async (req) => {
    await postModel.editProfileDetails({
      ...req.body,
      user_id: req.user.user_id,
    });

    return {
      message: "Post details updated successfully",
      status: 200,
    };
  }),
  validateUsername: asyncHandler(async () => {
    return {
      message: "This username is available.",
      data: {
        available: true,
      },
      status: 200,
    };
  }),
};
