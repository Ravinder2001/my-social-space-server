const postModel = require("../model/posts.model");
const asyncHandler = require("../helpers/asyncHandler");
const OpenAI = require("openai");

const openai = new OpenAI();

module.exports = {
  createPost: asyncHandler(async (req) => {
    await postModel.createPost({ ...req.body, user_id: req.user.user_id });
    return {
      message: "Post created successfully",
      status: 201,
    };
  }),
  generateCaption: asyncHandler(async (req) => {
    const completion = await openai.chat.completions.create({
      messages: [
        { role: "system", content: "You are caption generator assistant." },
        {
          role: "user",
          content: `Generate a captivating caption for the following post:${req.body.prompt}.
                  and the caption should be under 255 words only.`,
        },
      ],
      model: "gpt-3.5-turbo",
      // max_tokens: 30,
    });

    return {
      message: "Post created successfully",
      data: completion.choices[0].message.content,
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
    return {
      message: result.message,
      status: 200,
    };
  }),

  addComment: asyncHandler(async (req) => {
    const { post_id } = req.params;
    await postModel.addComment({
      post_id,
      user_id: req.user.user_id,
      ...req.body,
    });
    return {
      message: "Comment added successfully",
      status: 201,
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
    const post = await postModel.getAllPosts(req.user.user_id);
    return {
      message: "Post retrieved successfully",
      data: post,
      status: 200,
    };
  }),
  getAllOwnPosts: asyncHandler(async (req) => {
    const post = await postModel.getAllOwnPosts(req.user.user_id);
    return {
      message: "Post retrieved successfully",
      data: post,
      status: 200,
    };
  }),
};
