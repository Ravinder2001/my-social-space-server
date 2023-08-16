const { Success, Bad, Image_Exp_Duration } = require("../utils/constant");
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
} = require("../models/post.modal");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const {
  getImageUrls,
  getImageDimensions,
} = require("../helpers/Reusable.function");
module.exports = {
  Add_Post: async (req, res) => {
    try {
      console.log("main jsg aya", req.body.caption);

      const post_id = uuidv4();
      const user_id = req.params.user_id;
      const caption = req.body.caption;
      const images = req.files;
      await AddPost({ id: post_id, user_id, caption });
      const imageUploadPromises = images.map(async (image, index) => {
        const image_name = image.originalname.split(".")[1];
        image.originalname = `image_${index + 1}` + "." + image_name;
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
        .status(200)
        .json({ message: "Post created successfully", status: Success });
    } catch (err) {
      res.status(Bad).json({ message: err.message, status: Bad });
    }
  },
  Get_Posts_By_UserID: async (req, res) => {
    try {
      const postsResponse = await GetPost({ user_id: req.params.user_id });
      const posts = postsResponse.rows;
      if (posts.length) {
        const postsWithImages = await getImageUrls(posts);
        return res
          .status(Success)
          .json({ data: postsWithImages, status: Success });
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
          let url = await Image_Link(comment.image_url);
          comment.image_url = url;
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
            let url = await Image_Link(like.image_url);
            like.image_url = url;
            if ((like.id = req.customData)) {
              user_like = true;
            }
            delete like.id
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
        user_id: req.body.user_id,
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
        user_id: req.body.user_id,
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
        user_id: req.body.user_id,
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
          const dimensions = await getImageDimensions(url);

          delete image.image_url;
          image.src = url;
          image.width = +(dimensions.width / dimensions.height).toFixed(2);
          image.height = +(dimensions.height / dimensions.width).toFixed(2);

          return image;
        });
        const commentRes = post.rows[0].comments.map(async (comment) => {
          const url = await Image_Link(comment.image_url);
          comment.image_url = url;
        });
        await Promise.all(postImageRes, commentRes);
        return res
          .status(Success)
          .json({ data: post.rows[0], status: Success });
      }
      return res.status(Success).json({ data: null, status: Success });
    } catch (err) {
      res.status(Bad).json({ message: err.message, status: Bad });
    }
  },
};
