const client = require("../configuration/db");

module.exports = {
  getNotifications: async (user_id) => {
    try {
      const query = `
        SELECT
        *
        FROM
        tbl_notifications
        WHERE
        user_id = $1
      `;
      const params = [user_id];
      const result = await client.query(query, params);

      return result.rows;
    } catch (error) {
      console.error("Error in sending friend request:", error.message);
      throw error;
    }
  },
  /**
   * @typedef {'LIKE' | 'COMMENT' | 'FOLLOW' | 'FRIEND_REQUEST' | 'MESSAGE' | 'GROUP_MESSAGE'} NotificationType
   */

  /**
   * Creates a new notification.
   * @param {{
   *   user_id: number,
   *   type: NotificationType,
   *   post_id?: number|null,
   *   details?: object|null,
   * }} params
   */
  createNotification: async ({ user_id, type, post_id = null, details = null }) => {
    try {
      const query = `
     INSERT INTO tbl_notifications (
       user_id,
       type,
       post_id,
       details
     ) VALUES (
       $1, $2, $3, $4
     ) RETURNING *;
   `;

      const values = [user_id, type, post_id, details];

      const result = await client.query(query, values);
      return result.rows[0];
    } catch (error) {
      console.error("Error in creating notification:", error.message);
      throw error;
    }
  },
  markAsRead: async ({ notification_ids }) => {
    try {
      const query = `
        UPDATE tbl_notifications
        SET is_read = TRUE
        WHERE notification_id = ANY($1)
      `;

      const values = [notification_ids];

      const result = await client.query(query, values);
      return result.rows; // return all updated notifications
    } catch (error) {
      console.error("Error in marking notifications as read:", error.message);
      throw error;
    }
  },
};
