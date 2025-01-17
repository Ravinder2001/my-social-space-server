const friendModel = require("../model/friends.model");
const common = require("./common.controller");
const { HttpStatus } = require("../utils/constant/constant");
const Messages = require("../utils/constant/messages");

module.exports = {
  sendFriendReq: async (req, res) => {
    try {
      await friendModel.sendFriendReq({
        user_id: req.user.user_id,
        receiver_id: req.params.receiver_id,
      });
      return common.successResponse(res, Messages.FRIEND_REQ, HttpStatus.OK);
    } catch (error) {
      common.handleAsyncError(error, res);
    }
  },
};
