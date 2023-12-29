const {
  AddFriend,
  SendFriendRequest,
  UpdateFriendRequest,
  GetFriendRequestList,
  DeleteFriendRequest,
  DeleteFriendship,
  GetFriendList,
} = require("../models/friends.modal");
const { Image_Link } = require("../s3_bucket.config");
const { Bad, Success } = require("../utils/constant");
const { Something } = require("../utils/message");

module.exports = {
  Send_Friend_Request: async (req, res) => {
    try {
      const response = await SendFriendRequest({
        sender_id: req.customData,
        receiver_id: req.body.user_id,
      });
      if (response.rowCount > 0) {
        res.status(Success).json({ status: Success });
      }
    } catch (err) {
      res.status(Bad).json({ message: err.message, status: Bad });
    }
  },
  Accept_Friend_Request: async (req, res) => {
    try {
      const friendsResponse = await AddFriend({
        user1_id: req.customData,
        user2_id: req.body.user_id,
      });
      if (friendsResponse.rowCount > 0) {
        const deleteRequest = await DeleteFriendRequest({
          friend_request_id: req.body.request_id,
        });

        return res.status(Success).json({ status: Success });
      }
      return res.status(Bad).json({ message: Something, status: Bad });
    } catch (err) {
      res.status(Bad).json({ message: err.message, status: Bad });
    }
  },
  Delete_Friend_Request: async (req, res) => {
    try {
      const response = await DeleteFriendRequest({
        friend_request_id: req.params.friend_request_id,
      });
      if (response.rowCount > 0) {
        res.status(Success).json({ status: Success });
      }
    } catch (err) {
      res.status(Bad).json({ message: err.message, status: Bad });
    }
  },
  Delete_Friendship: async (req, res) => {
    try {
      const response = await DeleteFriendship({
        user1_id: req.customData,
        user2_id: req.params.user_id,
      });
      if (response.rowCount > 0) {
        res.status(Success).json({ status: Success });
      }
    } catch (err) {
      res.status(Bad).json({ message: err.message, status: Bad });
    }
  },
  Get_Friend_Request_List: async (req, res) => {
    try {
      const response = await GetFriendRequestList({ user_id: req.customData });
      await Promise.all(
        response.rows.map(async (image) => {
          if (image.image_url) {
            let url = await Image_Link(image.image_url);
            image.image_url = url;
          }
        })
      );
      res.status(Success).json({ data: response.rows, status: Success });
    } catch (err) {
      res.status(Bad).json({ message: err.message, status: Bad });
    }
  },
  Get_Friend_List: async (req, res) => {
    try {
      const response = await GetFriendList({ user_id: req.customData,name:req.query.name });
      await Promise.all(
        response.rows.map(async (image) => {
          if (image.image_url) {
            let url = await Image_Link(image.image_url);
            image.profile_picture = url;
            delete image.image_url
          }
        })
      );
      res.status(Success).json({ data: response.rows, status: Success });
    } catch (err) {
      res.status(Bad).json({ message: err.message, status: Bad });
    }
  },
};
