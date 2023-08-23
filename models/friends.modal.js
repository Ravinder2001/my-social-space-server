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
};
