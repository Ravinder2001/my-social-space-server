const express = require("express");
const validateBody = require("../helpers/validateBodyHelper");
const schemas = require("../validations/notification/payloadValidation");
const notificationController = require("../controller/notification.controller");
// const { validatePostId, validatePostOwnership } = require("../middleware/postValidation");
const router = express.Router();

// Send a friend request
router.get("/", notificationController.getNotifications);
router.get("/unReadCount", notificationController.getUnReadCount);
router.post("/markAsRead", validateBody(schemas.markAsRead), notificationController.markAsRead);

module.exports = router;
