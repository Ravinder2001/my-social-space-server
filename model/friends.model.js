const client = require("../configuration/db");

module.exports = {
  sendFriendRequest: async ({ sender_id, receiver_id }) => {
    try {
      const query = `
        INSERT INTO tbl_friend_requests (sender_id, receiver_id, status)
        VALUES ($1, $2, 'PENDING')
        RETURNING request_id
      `;
      const params = [sender_id, receiver_id];
      const result = await client.query(query, params);

      return result.rows[0];
    } catch (error) {
      console.error("Error in sending friend request:", error.message);
      throw error;
    }
  },

  respondFriendRequest: async ({ request_id, user_id, status }) => {
    try {
      await client.query("BEGIN");

      const fetchRequestQuery = `
        SELECT request_id, sender_id, receiver_id 
        FROM tbl_friend_requests 
        WHERE request_id = $1 AND receiver_id = $2
      `;
      const fetchRequestParams = [request_id, user_id];
      const requestResult = await client.query(fetchRequestQuery, fetchRequestParams);

      if (requestResult.rows.length === 0) {
        throw new Error("Friend request not found or user not authorized");
      }

      const request = requestResult.rows[0];

      if (status === "ACCEPTED") {
        const friendshipQuery = `
          INSERT INTO tbl_friendships (user_id_1, user_id_2)
          VALUES ($1, $2)
          RETURNING friendship_id, user_id_1, user_id_2, created_at;
        `;
        const friendshipParams = [Math.min(request.sender_id, request.receiver_id), Math.max(request.sender_id, request.receiver_id)];
        await client.query(friendshipQuery, friendshipParams);
      }

      const deleteQuery = `
        DELETE FROM tbl_friend_requests 
        WHERE request_id = $1 AND receiver_id = $2
      `;
      await client.query(deleteQuery, fetchRequestParams);

      await client.query("COMMIT");

      return;
    } catch (error) {
      await client.query("ROLLBACK");
      console.error("Error in responding to friend request:", error.message);
      throw error;
    }
  },
  removeFriend: async ({ user_id, friend_id }) => {
    try {
      const query = `
        DELETE FROM tbl_friendships 
        WHERE (user_id_1 = $1 AND user_id_2 = $2) OR (user_id_1 = $2 AND user_id_2 = $1)
        RETURNING friendship_id;
      `;
      const params = [Math.min(user_id, friend_id), Math.max(user_id, friend_id)];
      const result = await client.query(query, params);

      if (result.rows.length === 0) {
        throw new Error("Friendship not found");
      }

      return { friendship_id: result.rows[0].friendship_id, message: "Friend removed successfully" };
    } catch (error) {
      console.error("Error in removing friend:", error.message);
      throw error;
    }
  },

  getFriendRequests: async ({ user_id }) => {
    try {
      const query = `
        SELECT 
        fr.request_id,
        fr.created_at,
        u.full_name as sender_name, 
        u.profile_picture as sender_picture
        FROM tbl_friend_requests fr
        JOIN tbl_users u ON fr.sender_id = u.user_id
        WHERE fr.receiver_id = $1;
      `;
      const params = [user_id];
      const result = await client.query(query, params);

      return result.rows;
    } catch (error) {
      console.error("Error in getting friend requests:", error.message);
      throw error;
    }
  },

  getFriends: async ({ user_id }) => {
    try {
      const query = `
        SELECT f.friendship_id, 
               CASE 
                 WHEN f.user_id_1 = $1 THEN f.user_id_2 
                 ELSE f.user_id_1 
               END as friend_id,
               u.full_name as friend_name,
               u.profile_picture as friend_picture,
               f.created_at
        FROM tbl_friendships f
        JOIN tbl_users u ON (f.user_id_1 = u.user_id OR f.user_id_2 = u.user_id)
        WHERE (f.user_id_1 = $1 OR f.user_id_2 = $1) AND u.user_id != $1;
      `;
      const params = [user_id];
      const result = await client.query(query, params);

      return result.rows;
    } catch (error) {
      console.error("Error in getting friends:", error.message);
      throw error;
    }
  },

  searchUsers: async (searchQuery, currentUserId) => {
    try {
      let query;
      let values;

      if (searchQuery && searchQuery.trim().length >= 3) {
        query = `
          SELECT 
            u.user_id, 
            u.full_name AS user_name, 
            u.profile_picture,
            u.bio,
            EXISTS (
              SELECT 1 FROM tbl_friendships f
              WHERE 
                (f.user_id_1 = u.user_id AND f.user_id_2 = $2) OR
                (f.user_id_2 = u.user_id AND f.user_id_1 = $2)
            ) AS "isFriend",
            EXISTS (
              SELECT 1 FROM tbl_friend_requests fr
              WHERE 
                fr.sender_id = $2
                AND fr.receiver_id = u.user_id
                AND fr.status = 'PENDING'
            ) AS "isRequested"
          FROM tbl_users u
          WHERE LOWER(u.full_name) LIKE LOWER($1)
            AND u.user_id != $2
          ORDER BY u.full_name
          LIMIT 20;
        `;
        values = [`%${searchQuery.trim()}%`, currentUserId];
      } else {
        query = `
          SELECT 
            u.user_id, 
            u.full_name AS user_name, 
            u.profile_picture,
            u.bio,
            EXISTS (
              SELECT 1 FROM tbl_friendships f
              WHERE 
                (f.user_id_1 = u.user_id AND f.user_id_2 = $1) OR
                (f.user_id_2 = u.user_id AND f.user_id_1 = $1)
            ) AS "isFriend",
            EXISTS (
              SELECT 1 FROM tbl_friend_requests fr
              WHERE 
                fr.sender_id = $1
                AND fr.receiver_id = u.user_id
                AND fr.status = 'PENDING'
            ) AS "isRequested"
          FROM tbl_users u
          WHERE u.user_id != $1
          ORDER BY u.created_at DESC
          LIMIT 6;
        `;
        values = [currentUserId];
      }

      const result = await client.query(query, values);
      return result.rows;
    } catch (error) {
      console.error("Error searching users:", error.message);
      throw error;
    }
  },
};
