const client = require("../configuration/db");

module.exports = {
  getFriendsList: async ({ user_id }) => {
    try {
      const query = `
        SELECT u.user_id, u.full_name, u.email, u.profile_picture
        FROM tbl_friendships f
        JOIN tbl_users u ON (u.user_id = f.user_id_1 OR u.user_id = f.user_id_2)
        WHERE (f.user_id_1 = $1 OR f.user_id_2 = $1)
          AND u.user_id != $1;
      `;
      const result = await client.query(query, [user_id]);
      return result.rows;
    } catch (error) {
      console.error("Error fetching friend list:", error.message);
      throw error;
    }
  },
  createChannel: async ({ is_group = false, name = null, created_by }) => {
    try {
      const query = `
        INSERT INTO tbl_message_channels (is_group, name, created_by)
        VALUES ($1, $2, $3)
        RETURNING channel_id, is_group, name, created_by, created_at;
      `;
      const params = [is_group, name, created_by];
      const result = await client.query(query, params);
      return result.rows[0];
    } catch (error) {
      console.error("Error creating channel:", error.message);
      throw error;
    }
  },
  addParticipantsToChannel: async ({ channel_id, user_ids }) => {
    try {
      const values = user_ids.map((uid, i) => `($1, $${i + 2})`).join(", ");
      const query = `
        INSERT INTO tbl_channel_participants (channel_id, user_id)
        VALUES ${values}
        ON CONFLICT DO NOTHING;
      `;
      const params = [channel_id, ...user_ids];
      await client.query(query, params);
    } catch (error) {
      console.error("Error adding participants:", error.message);
      throw error;
    }
  },
  sendMessage: async ({ channel_id, sender_id, message }) => {
    try {
      const query = `
        INSERT INTO tbl_messages (channel_id, sender_id, message)
        VALUES ($1, $2, $3)
        RETURNING message_id, channel_id, sender_id, message, sent_at;
      `;
      const result = await client.query(query, [channel_id, sender_id, message]);
      return result.rows[0];
    } catch (error) {
      console.error("Error sending message:", error.message);
      throw error;
    }
  },
  getMessages: async ({ channel_id, after = null }) => {
    try {
      const query = `
        SELECT m.*, u.full_name, u.profile_picture
        FROM tbl_messages m
        JOIN tbl_users u ON m.sender_id = u.user_id
        WHERE m.channel_id = $1
          ${after ? "AND m.sent_at > $2" : ""}
        ORDER BY m.sent_at ASC;
      `;
      const params = after ? [channel_id, after] : [channel_id];
      const result = await client.query(query, params);
      return result.rows;
    } catch (error) {
      console.error("Error fetching messages:", error.message);
      throw error;
    }
  },
  markAsSeen: async ({ channel_id, user_id, seen_at }) => {
    try {
      const query = `
        INSERT INTO tbl_channel_seen_status (channel_id, user_id, seen_at)
        VALUES ($1, $2, $3)
        ON CONFLICT (channel_id, user_id)
        DO UPDATE SET seen_at = GREATEST(tbl_channel_seen_status.seen_at, EXCLUDED.seen_at);
      `;
      await client.query(query, [channel_id, user_id, seen_at]);
    } catch (error) {
      console.error("Error updating seen status:", error.message);
      throw error;
    }
  },
  getUserChannels: async ({ user_id }) => {
    try {
      const query = `
        SELECT c.channel_id, c.name, c.is_group, c.created_at
        FROM tbl_message_channels c
        JOIN tbl_channel_participants p ON c.channel_id = p.channel_id
        WHERE p.user_id = $1;
      `;
      const result = await client.query(query, [user_id]);
      return result.rows;
    } catch (error) {
      console.error("Error getting user's channels:", error.message);
      throw error;
    }
  },
};
