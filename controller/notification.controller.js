const notificationModel = require("../model/notification.model");
const asyncHandler = require("../helpers/asyncHandler");

module.exports = {
  getNotifications: asyncHandler(async (req) => {
    const request = await notificationModel.getNotifications(req.user.user_id);
    return {
      message: "Notifications fetched successfully",
      data: request,
      status: 200,
    };
  }),
  markAsRead: asyncHandler(async (req) => {
    await notificationModel.markAsRead({ notification_ids: req.body.notification_ids });
    return {
      message: "Notifications marked as read successfully",
      status: 200,
    };
  }),
};
