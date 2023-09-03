const {
  AddFriend,
  SendFriendRequest,
  UpdateFriendRequest,
  GetFriendRequestList,
  AcceptFriendRequest,
} = require("../models/friends.modal");
const { Image_Link } = require("../s3_bucket.config");
const { Bad, Success } = require("../utils/constant");

module.exports = {
  Add_Friend: async (req, res) => {
    try {
      const response = await AddFriend({
        user1_id: req.customData,
        user2_id: req.body.user_id,
      });
      if (response.rowCount > 0) {
        res.status(Success).json({ status: Success });
      }
    } catch (err) {
      res.status(Bad).json({ message: err.message, status: Bad });
    }
  },
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
      const response = await AcceptFriendRequest({
        friend_request_id: req.params.friend_request_id,
        status: 2,
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
          let url = await Image_Link(image.image_url);
          image.image_url = url;
        })
      );
      res.status(Success).json({ data: response.rows, status: Success });
    } catch (err) {
      res.status(Bad).json({ message: err.message, status: Bad });
    }
  },
};
