const client = require("../configuration/db");

module.exports = {
  createPost: async (postDetails) => {
    try {
      await client.query("BEGIN");

      // Insert into tbl_posts with is_active = false if post is scheduled
      const insertPostQuery = `
        INSERT INTO tbl_posts (user_id, caption, post_visibility, allow_comments, allow_likes, is_active)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING post_id;
      `;
      const postValues = [
        postDetails.user_id,
        postDetails.caption || null,
        postDetails.post_visibility,
        postDetails.allow_comments,
        postDetails.allow_likes,
        postDetails.isPostScheduled ? false : true, // is_active depends on scheduling
      ];
      const { rows } = await client.query(insertPostQuery, postValues);
      const post_id = rows[0].post_id;

      // If post is scheduled, insert into tbl_scheduled_posts
      if (postDetails.isPostScheduled) {
        const insertScheduledPostQuery = `
          INSERT INTO tbl_scheduled_posts (post_id, scheduledDateTime)
          VALUES ($1, $2);
        `;
        await client.query(insertScheduledPostQuery, [post_id, postDetails.scheduledDateTime]);
      }

      // Insert images into tbl_post_images
      if (postDetails.images && postDetails.images.length > 0) {
        const insertImageQuery = `
          INSERT INTO tbl_post_images (post_id, image_url)
          VALUES ($1, $2);
        `;
        for (const image of postDetails.images) {
          await client.query(insertImageQuery, [post_id, image]);
        }
      }

      // Insert tags into tbl_post_tags
      if (postDetails.tags && postDetails.tags.length > 0) {
        const insertTagQuery = `
          INSERT INTO tbl_post_tags (post_id, tag_name)
          VALUES ($1, $2);
        `;
        for (const tag of postDetails.tags) {
          await client.query(insertTagQuery, [post_id, tag]);
        }
      }

      await client.query("COMMIT");
      return { post_id };
    } catch (error) {
      await client.query("ROLLBACK");
      throw new Error(error.message);
    }
  },
};
