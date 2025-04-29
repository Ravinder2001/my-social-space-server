const client = require("../configuration/db");

module.exports = {
  getNotifications: async (user_id, unRead) => {
    try {
      const query = `
        SELECT
          n.notification_id,
          n.created_at,
          u.profile_picture,
          CASE
            WHEN n.type = 'LIKE' THEN CONCAT(u.full_name, ' liked your post.')
            WHEN n.type = 'COMMENT' THEN CONCAT(u.full_name, ' commented on your post.')
            WHEN n.type = 'FRIEND_REQUEST' THEN CONCAT(u.full_name, ' has sent you a friend request.')
            WHEN n.type = 'FRIEND_ACCEPTED' THEN CONCAT(u.full_name, ' accepted your friend request.')
            WHEN n.type = 'SYSTEM' THEN 'This is a system notification.'
            ELSE 'Unknown notification.'
          END AS content,
          pi.image_url AS post_image_url
        FROM tbl_notifications n
        LEFT JOIN tbl_users u ON u.user_id = n.another_user_id
        LEFT JOIN LATERAL (
          SELECT image_url
          FROM tbl_post_images
          WHERE post_id = n.post_id
          ORDER BY image_id ASC
          LIMIT 1
        ) pi ON (n.type IN ('LIKE', 'COMMENT'))
        WHERE n.user_id = $1
        ${unRead == 1 ? "AND n.is_read = FALSE" : ""}
        ORDER BY n.created_at DESC;
      `;

      const params = [user_id];
      const result = await client.query(query, params);
      return result.rows;
    } catch (error) {
      console.error("Error in fetching notifications:", error.message);
      throw error;
    }
  },
  getUnReadCount: async (user_id) => {
    try {
      const query = `
        SELECT COUNT(*) AS unread_count
        FROM tbl_notifications
        WHERE user_id = $1 AND is_read = FALSE;
      `;
      const params = [user_id];
      const result = await client.query(query, params);

      return result.rows[0];
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
   *   another_user_id?: number|null,
   * }} params
   */
  createNotification: async ({ user_id, type, post_id = null, another_user_id = null }) => {
    try {
      const query = `
     INSERT INTO tbl_notifications (
       user_id,
       type,
       post_id,
       another_user_id
     ) VALUES (
       $1, $2, $3, $4
     ) RETURNING *;
   `;

      const values = [user_id, type, post_id, another_user_id];

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
