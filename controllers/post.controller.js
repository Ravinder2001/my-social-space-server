const {
  Success,
  Bad,
  Image_Exp_Duration,
  Invalid_User,
} = require("../utils/constant");
const { bucket_name } = require("../utils/config");
const { PutObjectCommand } = require("@aws-sdk/client-s3");
const { s3, Image_Link } = require("../s3_bucket.config");
const { v4: uuidv4 } = require("uuid");
const {
  AddPost,
  AddPostImages,
  GetPost,
  DeletePost,
  AddComment,
  AddLikes,
  AddLike,
  RemoveLike,
  GetComments,
  GetLikes,
  GetPostWithPostId,
  RemoveComment,
  GetPostSelf,
  GetPostByUserId,
} = require("../models/post.modal");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const {
  getImageUrls,
  getImageDimensions,
} = require("../helpers/Reusable.function");
module.exports = {
  Add_Post: async (req, res) => {
    try {
      const post_id = uuidv4();
      const user_id = req.customData;
      const caption = req.body.caption;
      const images = req.files;
      await AddPost({ id: post_id, user_id, caption });
      const imageUploadPromises = images.map(async (image, index) => {
        image.originalname = `image_${index + 1}` + ".jpeg";
        const Key = `Posts/${user_id}/${post_id}/${image.originalname}`;
        const params = {
          Bucket: bucket_name,
          Key,
          Body: image.buffer,
          ContentType: image.mimetype,
        };
        const command = new PutObjectCommand(params);
        const imageresponse = await s3.send(command);
        if (imageresponse.$metadata.httpStatusCode == Success) {
          await AddPostImages({ post_id, image: Key });
        }
      });

      await Promise.all(imageUploadPromises);

      return res
        .status(Success)
        .json({ message: "Post created successfully", status: Success });
    } catch (err) {
      res.status(Bad).json({ message: err.message, status: Bad });
    }
  },
  Get_Self_Posts: async (req, res) => {
    try {
      const postsResponse = await GetPostSelf({ user_id: req.customData });
      const posts = postsResponse.rows;
      if (posts.length) {
        await Promise.all(
          posts.map(async (item) => {
            const profile_url = await Image_Link(item.profile_picture);
            item.profile_picture = profile_url;

            if (item.images.length) {
              await Promise.all(
                item.images.map(async (image) => {
                  let url = await Image_Link(image.image_url);
                  image.image_url = url;
                })
              );
            }
            if (item.user_id == req.customData) {
              item.editable = true;
            }
            delete item.user_id;

            return item;
          })
        );
        return res.status(Success).json({ data: posts, status: Success });
      }

      return res.status(Success).json({ data: [], status: Success });
    } catch (err) {
      res.status(Bad).json({ message: err.message, status: Bad });
    }
  },
  Get_Posts_By_UserID: async (req, res) => {
    try {
      const postsResponse = await GetPostByUserId({ user_id: req.customData });
      const posts = postsResponse.rows;
      if (posts.length) {
        await Promise.all(
          posts.map(async (item) => {
            const profile_url = await Image_Link(item.profile_picture);
            item.profile_picture = profile_url;

            if (item.images.length) {
              await Promise.all(
                item.images.map(async (image) => {
                  let url = await Image_Link(image.image_url);
                  image.image_url = url;
                })
              );
            }
            if (item.user_id == req.customData) {
              item.editable = true;
            } else {
              item.editable = false;
            }
            delete item.user_id;

            return item;
          })
        );
        return res.status(Success).json({ data: posts, status: Success });
      }

      return res.status(Success).json({ data: [], status: Success });
    } catch (err) {
      res.status(Bad).json({ message: err.message, status: Bad });
    }
  },
  Get_Posts_Comments: async (req, res) => {
    try {
      const commentsResponse = await GetComments({
        post_id: req.params.post_id,
      });
      const comments = commentsResponse.rows;
      await Promise.all(
        comments.map(async (comment) => {
          if (comment.image_url) {
            let url = await Image_Link(comment?.image_url);
            comment.image_url = url;
          } else {
            comment.image_url = Invalid_User;
          }
          if (
            comment.user_id == req.customData ||
            comment.post_admin == req.customData
          ) {
            comment.editable = true;
          } else {
            comment.editable = false;
          }
          delete comment.user_id;
          delete comment.post_admin;
        })
      );

      res.status(Success).json({ data: comments, status: Success });
    } catch (err) {
      res.status(Bad).json({ message: err.message, status: Bad });
    }
  },
  Get_Posts_Likes: async (req, res) => {
    try {
      const likesResponse = await GetLikes({
        post_id: req.params.post_id,
      });
      const likes = likesResponse.rows;
      let user_like = false;
      if (likes.length) {
        await Promise.all(
          likes.map(async (like) => {
            if (like.image_url) {
              let url = await Image_Link(like.image_url);
              like.image_url = url;
            } else {
              like.image_url = Invalid_User;
            }

            if (like.id == req.customData) {
              user_like = true;
            }
            delete like.id;
          })
        );
      }

      res
        .status(Success)
        .json({ data: { list: likes, user_like: user_like }, status: Success });
    } catch (err) {
      res.status(Bad).json({ message: err.message, status: Bad });
    }
  },
  Delete_Post: async () => {
    try {
      const response = await DeletePost({
        post_id: req.params.post_id,
        user_id: req.customData,
      });
      if (response.rowCount > 0) {
        res
          .status(Success)
          .json({ data: "Post Deleted Succesfully", status: Success });
      }
    } catch (err) {
      res.status(Bad).json({ message: err.message, status: Bad });
    }
  },
  Add_Comment: async (req, res) => {
    try {
      const response = await AddComment({
        post_id: req.params.post_id,
        user_id: req.customData,
        content: req.body.content,
      });
      if (response.rowCount > 0) {
        res.status(Success).json({ status: Success });
      }
    } catch (err) {
      res.status(Bad).json({ message: err.message, status: Bad });
    }
  },
  Add_Like: async (req, res) => {
    try {
      const response = await AddLike({
        post_id: req.params.post_id,
        user_id: req.customData,
      });
      if (response.rowCount > 0) {
        res.status(Success).json({ status: Success });
      }
    } catch (err) {
      res.status(Bad).json({ message: err.message, status: Bad });
    }
  },
  Remove_Like: async (req, res) => {
    try {
      await RemoveLike({
        user_id: req.customData,
        post_id: req.params.post_id,
      });

      return res.status(Success).json({ status: Success });
    } catch (err) {
      res.status(Bad).json({ message: err.message, status: Bad });
    }
  },
  Get_Posts_By_PostID: async (req, res) => {
    try {
      const post = await GetPostWithPostId({ post_id: req.params.post_id });
      if (post.rows.length) {
        const user_profile_picture = await Image_Link(
          post.rows[0].profile_picture
        );
        post.rows[0].profile_picture = user_profile_picture;

        const postImageRes = post.rows[0].images.map(async (image) => {
          const url = await Image_Link(image.image_url);

          image.image_url = url;

          return image;
        });
        await Promise.all(postImageRes);
        if (post.rows[0].user_id == req.customData) {
          post.rows[0].editable = true;
        }
        delete post.rows[0].user_id;
        return res
          .status(Success)
          .json({ data: post.rows[0], status: Success });
      }
      return res.status(Success).json({ data: null, status: Success });
    } catch (err) {
      res.status(Bad).json({ message: err.message, status: Bad });
    }
  },
  Remove_Comment: async (req, res) => {
    try {
      await RemoveComment({
        comment_id: req.params.comment_id,
      });

      return res.status(Success).json({ status: Success });
    } catch (err) {
      res.status(Bad).json({ message: err.message, status: Bad });
    }
  },
};
