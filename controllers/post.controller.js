const { Success, Bad, Image_Exp_Duration } = require("../utils/constant");
const { bucket_name } = require("../utils/config");
const { PutObjectCommand } = require("@aws-sdk/client-s3");
const { s3, Image_Link } = require("../s3_bucket.config");
const { v4: uuidv4 } = require("uuid");
const {
  AddPost,
  AddPostImages,
  GetPost,
  GetPostImages,
  DeletePost,
} = require("../models/post.modal");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
module.exports = {
  Add_Post: async (req, res) => {
    try {
      const post_id = uuidv4();
      const user_id = req.params.user_id;
      const caption = req.body.caption;
      const images = req.files;

      await AddPost({ id: post_id, user_id, caption });
      const imageUploadPromises = images.map(async (image) => {
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
      let posts = await GetPost({ user_id: req.params.user_id });
      for (let post of posts.rows) {
        for (let image of post.images) {
          let link = await Image_Link(image.image_url);
          image.image_url = link;
        }
      }
      res.status(Success).json({ data: posts.rows, status: Success });
    } catch (err) {
      res.status(Bad).json({ message: err.message, status: Bad });
    }
  },
  Delete_Post: async () => {
    try {
      const response = await DeletePost({ post_id: req.params.post_id });
      if (response.rowCount > 0) {
        res
          .status(Success)
          .json({ data: "Post Deleted Succesfully", status: Success });
      }
    } catch (err) {
      res.status(Bad).json({ message: err.message, status: Bad });
    }
  },
};
