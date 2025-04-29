const notificationModel = require("../model/notification.model");
const asyncHandler = require("../helpers/asyncHandler");
const { generatePreSignedURL } = require("../utils/common/imageUploadToS3");

module.exports = {
  getNotifications: asyncHandler(async (req) => {
    const request = await notificationModel.getNotifications(req.user.user_id, req.query.unRead);
    const updatedUsers = await Promise.all(
      request.map(async (post) => {
        if (post.profile_picture) {
          post.profile_picture = await generatePreSignedURL(post.profile_picture);
        }
        if (post.post_image_url) {
          post.post_image_url = await generatePreSignedURL(post.post_image_url);
        }
        return post;
      })
    );
    return {
      message: "Notifications fetched successfully",
      data: updatedUsers,
      status: 200,
    };
  }),
  getUnReadCount: asyncHandler(async (req) => {
    const request = await notificationModel.getUnReadCount(req.user.user_id);
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
