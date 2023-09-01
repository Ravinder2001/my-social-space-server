const client = require("../config/db");

module.exports = {
  AddFriend: ({ user1_id, user2_id }) => {
    return new Promise(function (resolve, reject) {
      try {
        const response = client.query(
          `INSERT INTO friends(user1_id,user2_id) VALUES ($1,$2)`,
          [user1_id, user2_id]
        );
        resolve(response);
      } catch (err) {
        reject(err);
      }
    });
  },
  SendFriendRequest: ({ sender_id, receiver_id }) => {
    return new Promise(function (resolve, reject) {
      try {
        const response = client.query(
          `INSERT INTO friend_requests(sender_id,receiver_id) VALUES ($1,$2)`,
          [sender_id, receiver_id]
        );
        resolve(response);
      } catch (err) {
        reject(err);
      }
    });
  },
  UpdateFriendRequest: ({ friend_request_id, status }) => {
    return new Promise(function (resolve, reject) {
      try {
        const response = client.query(
          `UPDATE friend_requests SET status=$2 WHERE id=$1`,
          [friend_request_id, status]
        );
        resolve(response);
      } catch (err) {
        reject(err);
      }
    });
  },
};
