const client = require("../configuration/db");

module.exports = {
  sendFriendRequest: async ({ sender_id, receiver_id }) => {
    try {
      const query = `
        INSERT INTO tbl_friend_requests (sender_id, receiver_id, status)
        VALUES ($1, $2, 'PENDING')
        RETURNING request_id, sender_id, receiver_id, status, created_at;
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

      const requestQuery = `
        UPDATE tbl_friend_requests 
        SET status = $1, updated_at = CURRENT_TIMESTAMP
        WHERE request_id = $2 AND receiver_id = $3
        RETURNING request_id, sender_id, receiver_id, status;
      `;
      const requestParams = [status, request_id, user_id];
      const requestResult = await client.query(requestQuery, requestParams);

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
        const friendshipResult = await client.query(friendshipQuery, friendshipParams);
        request.friendship = friendshipResult.rows[0];
      }

      await client.query("COMMIT");
      return request;
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

  followUser: async ({ follower_id, followed_id }) => {
    try {
      const query = `
        INSERT INTO tbl_follows (follower_id, followed_id)
        VALUES ($1, $2)
        RETURNING follow_id, follower_id, followed_id, created_at;
      `;
      const params = [follower_id, followed_id];
      const result = await client.query(query, params);

      return result.rows[0];
    } catch (error) {
      console.error("Error in following user:", error.message);
      throw error;
    }
  },

  unfollowUser: async ({ follower_id, followed_id }) => {
    try {
      const query = `
        DELETE FROM tbl_follows 
        WHERE follower_id = $1 AND followed_id = $2
        RETURNING follow_id;
      `;
      const params = [follower_id, followed_id];
      const result = await client.query(query, params);

      if (result.rows.length === 0) {
        throw new Error("Follow relationship not found");
      }

      return { follow_id: result.rows[0].follow_id, message: "Unfollowed successfully" };
    } catch (error) {
      console.error("Error in unfollowing user:", error.message);
      throw error;
    }
  },

  getFriendRequests: async ({ user_id, status = "PENDING" }) => {
    try {
      const query = `
        SELECT fr.request_id, fr.sender_id, fr.receiver_id, fr.status, fr.created_at, fr.updated_at,
               u.full_name as sender_name, u.profile_picture as sender_picture
        FROM tbl_friend_requests fr
        JOIN tbl_users u ON fr.sender_id = u.user_id
        WHERE fr.receiver_id = $1 AND fr.status = $2;
      `;
      const params = [user_id, status];
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

  getFollowers: async ({ user_id }) => {
    try {
      const query = `
        SELECT f.follow_id, f.follower_id, u.full_name as follower_name, 
               u.profile_picture as follower_picture, f.created_at
        FROM tbl_follows f
        JOIN tbl_users u ON f.follower_id = u.user_id
        WHERE f.followed_id = $1;
      `;
      const params = [user_id];
      const result = await client.query(query, params);

      return result.rows;
    } catch (error) {
      console.error("Error in getting followers:", error.message);
      throw error;
    }
  },

  getFollowing: async ({ user_id }) => {
    try {
      const query = `
        SELECT f.follow_id, f.followed_id, u.full_name as followed_name, 
               u.profile_picture as followed_picture, f.created_at
        FROM tbl_follows f
        JOIN tbl_users u ON f.followed_id = u.user_id
        WHERE f.follower_id = $1;
      `;
      const params = [user_id];
      const result = await client.query(query, params);

      return result.rows;
    } catch (error) {
      console.error("Error in getting following:", error.message);
      throw error;
    }
  },
  searchUsers: async (searchQuery) => {
    try {
      // Check if the query has at least 3 characters
      if (!searchQuery || searchQuery.trim().length < 3) {
        return []; // Return empty array if too short
      }

      const query = `
        SELECT 
          user_id, 
          full_name as user_name, 
          profile_picture
        FROM tbl_users
        WHERE LOWER(full_name) LIKE LOWER($1)
        ORDER BY full_name
        LIMIT 20;
      `;

      const values = [`%${searchQuery.trim()}%`];

      const result = await client.query(query, values);
      return result.rows;
    } catch (error) {
      console.error("Error searching users:", error.message);
      throw error;
    }
  },
};
