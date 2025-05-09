const client = require("../configuration/db");

module.exports = {
  getFriendsList: async ({ user_id, searchQuery }) => {
    try {
      const query = `
          WITH user_friends AS (
            SELECT 
              u.user_id,
              u.full_name as name,
              u.username,
              u.profile_picture,
              f.created_at
            FROM 
              tbl_users u
            JOIN 
              tbl_friendships f 
              ON (u.user_id = f.user_id_1 AND f.user_id_2 = $1)
               OR (u.user_id = f.user_id_2 AND f.user_id_1 = $1)
            WHERE 
              u.user_id != $1
          )
          SELECT 
            user_id,
            name,
            profile_picture
          FROM user_friends
          WHERE 
            ($2 != '' AND (name ILIKE '%' || $2 || '%' OR username ILIKE '%' || $2 || '%'))
             OR ($2 = '')
          ORDER BY 
            created_at
          LIMIT 
            CASE WHEN $2 = '' THEN 5 ELSE NULL END;
`;
      const result = await client.query(query, [user_id, searchQuery ?? ""]);
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
  sendMessage: async (values) => {
    try {
      const query = `
        INSERT INTO tbl_messages (channel_id, sender_id, message, content_type)
        VALUES ($1, $2, $3, $4)
        RETURNING message_id, sent_at;
      `;
      const insertResult = await client.query(query, [values.channel_id, values.sender_id, values.message, values.content_type]);

      const channelMembers = await client.query(`SELECT user_id FROM tbl_channel_participants WHERE channel_id=$1 AND user_id != $2`, [values.channel_id, values.sender_id]);
      return { ...insertResult.rows[0], channelMembers: channelMembers.rows };
    } catch (error) {
      console.error("Error sending message:", error.message);
      throw error;
    }
  },
  getMessages: async ({ channel_id }) => {
    try {
      const query = `
        SELECT m.message_id, m.sender_id, m.message, m.sent_at, m.content_type
        FROM tbl_messages m
        WHERE m.channel_id = $1
        ORDER BY m.sent_at ASC;
      `;
      const params = [channel_id];
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
        SELECT 
          c.channel_id,
          CASE 
            WHEN c.is_group THEN c.name 
            ELSE u.full_name 
          END AS channel_name,
          CASE 
            WHEN c.is_group THEN NULL 
            ELSE u.profile_picture 
          END AS profile_picture,
          m.message AS last_message,
          m.content_type,
          COALESCE(m.sent_at, c.created_at) AS sent_at
        FROM tbl_message_channels c
        JOIN tbl_channel_participants p ON c.channel_id = p.channel_id
        LEFT JOIN tbl_channel_participants op ON op.channel_id = c.channel_id AND op.user_id != $1
        LEFT JOIN tbl_users u ON u.user_id = op.user_id
        LEFT JOIN LATERAL (
            SELECT m1.message, m1.content_type, m1.sent_at
            FROM tbl_messages m1
            WHERE m1.channel_id = c.channel_id
            ORDER BY m1.sent_at DESC
            LIMIT 1
        ) m ON true
        WHERE p.user_id = $1
        ORDER BY COALESCE(m.sent_at, c.created_at) DESC;
      `;
      const result = await client.query(query, [user_id]);
      return result.rows;
    } catch (error) {
      console.error("Error getting user's channels:", error.message);
      throw error;
    }
  },
};
