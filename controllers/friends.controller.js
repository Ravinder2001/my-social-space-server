const { AddFriend } = require("../models/friends.modal");
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
};
