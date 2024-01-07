const client = require("../config/db");

module.exports = {
  AddFriend: ({ user1_id, user2_id }) => {
    return new Promise(function (resolve, reject) {
      try {
        const response = client.query(`INSERT INTO friends(user1_id,user2_id) VALUES ($1,$2)`, [user1_id, user2_id]);
        resolve(response);
      } catch (err) {
        reject(err);
      }
    });
  },
  SendFriendRequest: ({ sender_id, receiver_id }) => {
    return new Promise(function (resolve, reject) {
      try {
        const response = client.query(`INSERT INTO friend_requests(sender_id,receiver_id) VALUES ($1,$2)`, [sender_id, receiver_id]);
        resolve(response);
      } catch (err) {
        reject(err);
      }
    });
  },
  DeleteFriendRequest: ({ friend_request_id }) => {
    return new Promise(function (resolve, reject) {
      try {
        const response = client.query(`DELETE FROM friend_requests WHERE id=$1`, [friend_request_id]);
        resolve(response);
      } catch (err) {
        reject(err);
      }
    });
  },
  DeleteFriendship: ({ user1_id, user2_id }) => {
    return new Promise(function (resolve, reject) {
      try {
        const response = client.query(`DELETE FROM friends WHERE (user1_id=$1 AND user2_id=$2) OR (user1_id=$2 AND user2_id=$1)`, [
          user1_id,
          user2_id,
        ]);
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
          `SELECT friend_requests.id,users.name,users.id as user_id,friend_requests.created_at,
           profile_pictures.image_url
           FROM friend_requests 
           LEFT JOIN users ON users.id=friend_requests.sender_id
           LEFT JOIN profile_pictures ON profile_pictures.user_id=friend_requests.sender_id
           WHERE friend_requests.receiver_id=$1`,
          [user_id]
        );
        resolve(response);
      } catch (err) {
        reject(err);
      }
    });
  },
  GetFriendRequestBySenderAndReceiver: ({ sender_id, receiver_id }) => {
    return new Promise(function (resolve, reject) {
      try {
        const response = client.query(
          `SELECT id FROM friend_requests
           WHERE friend_requests.sender_id=$1 AND friend_requests.receiver_id=$2`,
          [sender_id, receiver_id]
        );
        resolve(response);
      } catch (err) {
        reject(err);
      }
    });
  },
  GetFriendList: ({ user_id, name }) => {
    return new Promise(function (resolve, reject) {
      try {
        const response = client.query(
          `SELECT users.id, users.name,users.job, profile_pictures.image_url
          FROM users
          JOIN friends ON (users.id = friends.user1_id OR users.id = friends.user2_id)
          LEFT JOIN profile_pictures ON users.id = profile_pictures.user_id
          WHERE users.name ILIKE $2
            AND (
              (friends.user1_id = users.id AND friends.user2_id = $1 AND friends.status = true)
              OR (friends.user2_id = users.id AND friends.user1_id = $1 AND friends.status = true)
            );
          `,
          [user_id, `%${name}%`]
        );
        resolve(response);
      } catch (err) {
        reject(err);
      }
    });
  },
};
