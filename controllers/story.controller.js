const { PutObjectCommand, DeleteObjectCommand } = require("@aws-sdk/client-s3");
const { AddStory, DeleteStory, FindStoryById, GetAllStory, FindStoryByUserId } = require("../models/story.modal");
const { s3, Image_Link } = require("../s3_bucket.config");
const { bucket_name } = require("../utils/config");
const { Bad, Success, SuccessWithNoContent } = require("../utils/constant");
const moment = require("moment/moment");

module.exports = {
  Add_Story: async (req, res) => {
    try {
      const { song, start_time, end_time } = req.body;
      const user = req.customData;

      req.file.originalname = user + moment() + ".png";
      const Key = `Story/${user}/${req.file.originalname}`;
      const Params = {
        Bucket: bucket_name,
        Key,
        Body: req.file.buffer,
        ContentType: req.file.mimetype,
      };
      const command = new PutObjectCommand(Params);
      const image_res = await s3.send(command);
      if (image_res.$metadata.httpStatusCode == Success) {
        await AddStory({ user_id: user, image_url: Key, song, start_time, end_time });
      }
      return res.status(Success).json({
        status: Success,
      });
    } catch (err) {
      res.status(Bad).json({ message: err.message, status: Bad });
    }
  },
  Delete_Story: async (req, res) => {
    try {
      const image_res = await FindStoryById({ story_id: req.params.story_id,user_id: req.customData});
      if (image_res.rows.length) {
        const params = {
          Bucket: bucket_name,
          Key: image_res.rows[0].image_url,
        };
        const command = new DeleteObjectCommand(params);
        const image_del_res = await s3.send(command);
        if (image_del_res.$metadata.httpStatusCode == SuccessWithNoContent) {
          const response = await DeleteStory({ user_id: req.customData, story_id: req.params.story_id });
          if (response.rowCount > 0)
            return res.status(Success).json({
              status: Success,
            });
        } else {
          res.status(Bad).json({ message: "Something went wrong in AWS", status: Bad });
        }
      } else {
        res.status(Bad).json({ message: "Story is not exists", status: Bad });
      }
    } catch (err) {
      res.status(Bad).json({ message: err.message, status: Bad });
    }
  },

  Get_All_Story: async (req, res) => {
    try {
      const response = await GetAllStory({ user_id: req.customData });

      if (response.rows.length) {
        // Use Promise.all to wait for all asynchronous operations to complete
        await Promise.all(
          response.rows.map(async (item) => {
            let profile_url = await Image_Link(item.profile_picture);
            item.profile_picture = profile_url;

            // Use Promise.all for the second map to wait for all inner promises
            await Promise.all(
              item.story.map(async (story) => {
                let story_url = await Image_Link(story.story_image);
                story.story_image = story_url;
              })
            );
          })
        );
      }

      return res.status(Success).json({
        status: Success,
        data: response.rows,
      });
    } catch (err) {
      res.status(Bad).json({ message: err.message, status: Bad });
    }
  },
  Find_Story_By_UserId: async (req, res) => {
    try {
      const response = await FindStoryByUserId({ user_id: req.params.user_id });
      await Promise.all(
        response.rows.map(async (story) => {
          let story_url = await Image_Link(story.story_image);
          story.story_image = story_url;
        })
      );
      return res.status(Success).json({
        status: Success,
        data: response.rows,
      });
    } catch (err) {
      res.status(Bad).json({ message: err.message, status: Bad });
    }
  },
};
