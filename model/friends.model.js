const client = require("../configuration/db");
const generateTimestamp = require("../utils/common/generateTimestamp");

module.exports = {
  sendFriendReq: async (values) => {
    try {
      const query = `
        INSERT INTO tbl_friend_requests(sender_id, receiver_id, status, created_at)  
        VALUES($1, $2, $3, $4)
      `;
      await client.query(query, [values.user_id, values.receiver_id, "PENDING", generateTimestamp()]);
      return;
    } catch (error) {
      throw new Error(error.message);
    }
  },
};
