const client = require("../configuration/db");
const generateTimestamp = require("../utils/common/generateTimestamp");

module.exports = {
  sendFriendReq: async (values) => {
    try {
      const query = `
        INSERT INTO tbl_friend_requests(sender_id, receiver_id, created_at)  
        VALUES($1, $2, $3)
      `;
      await client.query(query, [values.user_id, values.receiver_id, generateTimestamp()]);
      return;
    } catch (error) {
      throw new Error(error.message);
    }
  },
  acceptFriendReq: async (values) => {
    try {
      await client.query("BEGIN");

      const friendDataQuery = `SELECT * FROM tbl_friend_requests WHERE request_id = $1;`;

      const { rows } = await client.query(friendDataQuery, [values.request_id]);

      if (rows.length === 0) {
        throw new Error("Friend request not found");
      }

      const friendData = rows[0];

      const insertFriendQuery = `
        INSERT INTO tbl_friends(user1_id, user2_id, created_at)
        VALUES($1, $2, $3)
      `;
      await client.query(insertFriendQuery, [friendData.sender_id, friendData.receiver_id, generateTimestamp()]);

      await client.query(`DELETE FROM tbl_friend_requests WHERE request_id = $1;`, [values.request_id]);

      await await client.query("COMMIT");
      return;
    } catch (error) {
      await client.query("ROLLBACK");
      throw new Error(error.message);
    }
  },
  deleteFriendReq: async (values) => {
    try {
      await client.query(`DELETE FROM tbl_friend_requests WHERE request_id = $1;`, [values.request_id]);
      return;
    } catch (error) {
      throw new Error(error.message);
    }
  },
};
