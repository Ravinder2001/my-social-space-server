const commonController = require("../controller/common.controller");
const dbValidation = require("../utils/common/validation/dbValidation");
const { HttpStatus } = require("../utils/constant/constant");
const ChatModel = require("../model/chat.model");

module.exports = {
  validateMessageId: async (req, res, next) => {
    const { message_id } = req.params;

    try {
      const status = await dbValidation(message_id, "tbl_messages", "message_id", `sender_id = ${req.user.user_id}`);
      if (status === HttpStatus.BAD_REQUEST) {
        return commonController.errorResponse(res, "Not a valid Message id", HttpStatus.BAD_REQUEST);
      } else if (status === HttpStatus.NOT_FOUND) {
        return commonController.errorResponse(res, `Message not found with the id ${message_id}`, HttpStatus.NOT_FOUND);
      }
      next();
    } catch (error) {
      return commonController.handleAsyncError(error, res);
    }
  },
  validateChannelId: async (req, res, next) => {
    const { channel_id } = req.params;

    try {
      const channelMembers = await ChatModel.getChannelParticipants({
        channel_id,
      });
      const isMember = channelMembers.some((member) => member.user_id === req.user.user_id);
      if (!isMember) {
        return commonController.errorResponse(res, "You are not a member of this channel", HttpStatus.FORBIDDEN);
      }
      const status = await dbValidation(channel_id, "tbl_message_channels", "channel_id");
      if (status === HttpStatus.BAD_REQUEST) {
        return commonController.errorResponse(res, "Not a valid Channel id", HttpStatus.BAD_REQUEST);
      } else if (status === HttpStatus.NOT_FOUND) {
        return commonController.errorResponse(res, `Channel not found with the id ${channel_id}`, HttpStatus.NOT_FOUND);
      }
      next();
    } catch (error) {
      return commonController.handleAsyncError(error, res);
    }
  },
  validateChannelOwnership: async (req, res, next) => {
    const { channel_id } = req.params;

    try {
      const status = await dbValidation(channel_id, "tbl_message_channels", "channel_id", `created_by == ${req.user.user_id}`);
      if (status === HttpStatus.BAD_REQUEST) {
        return commonController.errorResponse(res, "Not a valid Channel id", HttpStatus.BAD_REQUEST);
      } else if (status === HttpStatus.NOT_FOUND) {
        return commonController.errorResponse(res, `Channel not found with the id ${channel_id}`, HttpStatus.NOT_FOUND);
      }
      next();
    } catch (error) {
      return commonController.handleAsyncError(error, res);
    }
  },
  validateIsChannelExists: async (req, res, next) => {
    const anotherUserId = req.body.user_ids[0];
    const currentUserId = req.user.user_id;

    try {
      const isChannelExists = await ChatModel.isChannelExists({
        user_id_1: currentUserId,
        user_id_2: anotherUserId,
      });

      if (isChannelExists) {
        return commonController.errorResponse(res, "This User is already in the channel", HttpStatus.BAD_REQUEST);
      }
      next();
    } catch (error) {
      return commonController.handleAsyncError(error, res);
    }
  },
};
