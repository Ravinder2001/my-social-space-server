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
  AcceptFriendRequest: ({ friend_request_id, status }) => {
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
  GetFriendRequestList: ({ user_id }) => {
    return new Promise(function (resolve, reject) {
      try {
        const response = client.query(
          `SELECT friend_requests.id,users.name,friend_requests.status,friend_requests.created_at,
           profile_pictures.image_url
           FROM friend_requests 
           LEFT JOIN users ON users.id=friend_requests.sender_id
           LEFT JOIN profile_pictures ON profile_pictures.user_id=friend_requests.sender_id
           WHERE friend_requests.receiver_id=$1 AND friend_requests.status=1`,
          [user_id]
        );
        resolve(response);
      } catch (err) {
        reject(err);
      }
    });
  },
};
