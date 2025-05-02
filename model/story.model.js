const client = require("../configuration/db");
const { removeFilesFromTrash } = require("./upload.model");

module.exports = {
  // Add a new story
  addStory: async ({ user_id, media_url, media_type = "IMAGE", song_name = null, song_start_time = null, song_end_time = null }) => {
    try {
      const result = await client.query(
        `
        INSERT INTO tbl_stories (user_id, media_url, media_type, song_name, song_start_time, song_end_time)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING *;
        `,
        [user_id, media_url, media_type, song_name, song_start_time, song_end_time]
      );
      await removeFilesFromTrash([media_url]);
      return result.rows[0];
    } catch (error) {
      console.error("Error in addStory:", error.message);
      throw error;
    }
  },

  // Get all stories of a user (only non-expired)
  getUserStories: async (user_id) => {
    try {
      const result = await client.query(
        `
        SELECT 
          s.story_id,
          s.user_id,
          s.media_url,
          s.media_type,
          s.song_name,
          s.song_start_time,
          s.song_end_time,
          s.created_at
        FROM tbl_stories s
        WHERE 
          s.expires_at > NOW()
          AND (
            s.user_id = $1 -- Own stories
            OR s.user_id IN (
              SELECT 
                CASE 
                  WHEN f.user_id_1 = $1 THEN f.user_id_2
                  ELSE f.user_id_1
                END AS friend_id
              FROM tbl_friendships f
              WHERE f.user_id_1 = $1 OR f.user_id_2 = $1
            )
          )
        ORDER BY s.created_at DESC;
        `,
        [user_id]
      );

      return result.rows;
    } catch (error) {
      console.error("Error in getUserStories:", error.message);
      throw error;
    }
  },

  // Delete a story by story_id and user_id (safe delete)
  deleteStory: async (story_id, user_id) => {
    try {
      await client.query("BEGIN");
      const result = await client.query(
        `
        DELETE FROM tbl_stories
        WHERE story_id = $1 AND user_id = $2
        RETURNING *;
        `,
        [story_id, user_id]
      );

      await client.query("COMMIT");
      return result.rows[0];
    } catch (error) {
      await client.query("ROLLBACK");
      console.error("Error in deleteStory:", error.message);
      throw error;
    }
  },
  removeExpiredStories: async () => {
    try {
      // Step 1: Get media URLs of expired stories
      const expiredStories = await client.query(
        `
        SELECT story_id, media_url
        FROM tbl_stories
        WHERE expires_at <= NOW();
        `
      );

      if (expiredStories.rowCount === 0) {
        return []; // No expired stories
      }

      const mediaUrls = expiredStories.rows.map((story) => story.media_url);
      const storyIds = expiredStories.rows.map((story) => story.story_id);

      // Step 2: Delete expired stories
      await client.query(
        `
        DELETE FROM tbl_stories
        WHERE story_id = ANY($1::int[]);
        `,
        [storyIds]
      );

      // Step 3: Return media URLs for S3 deletion
      return mediaUrls;
    } catch (error) {
      console.error("Error in removeExpiredStories:", error.message);
      throw error;
    }
  },
};
