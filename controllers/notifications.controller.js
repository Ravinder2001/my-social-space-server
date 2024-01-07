const { CreateNotifications, GetNotifications } = require("../models/Notifications.modal");
const { Image_Link } = require("../s3_bucket.config");
const { Bad, Success, SuccessWithNoContent } = require("../utils/constant");

module.exports = {
  Create_Notifications: async (req, res) => {
    try {
      console.log(req.body);
      const response = await CreateNotifications({
        user_id: req.body.user_id,
        notification_type: req.body.notification_type,
        message: req.body.message,
      });
      res.status(Success).json({ status: Success });
    } catch (err) {
      res.status(Bad).json({ message: err.message, status: Bad });
    }
  },
  Get_Notifications: async (req, res) => {
    try {
      const response = await GetNotifications({
        user_id: req.customData,
      });
      await Promise.all(
        response.rows.map(async (noti) => {
          let url = await Image_Link(noti.image_url);
          noti.image_url = url;
        })
      );
      res.status(Success).json({ data: response.rows, status: Success });
    } catch (err) {
      res.status(Bad).json({ message: err.message, status: Bad });
    }
  },
};
