const client = require("../config/db");

module.exports = {
  CreateNotifications: ({ user_id, notification_type, message, image }) => {
    return new Promise(function (resolve, reject) {
      try {
        const response = client.query(`INSERT INTO notifications(user_id, notification_type, message,image_url) VALUES ($1,$2,$3,$4)`, [
          user_id,
          notification_type,
          message,
          image,
        ]);
        resolve(response);
      } catch (err) {
        reject(err);
      }
    });
  },
  GetNotifications: ({ user_id }) => {
    return new Promise(function (resolve, reject) {
      try {
        const response = client.query(`SELECT id,notification_type,message,image_url,is_read,created_at FROM notifications WHERE user_id=$1 ORDER BY id DESC`, [
          user_id,
        ]);
        resolve(response);
      } catch (err) {
        reject(err);
      }
    });
  },
};
