const client = require("../configuration/db");
// const generateTimestamp = require("../utils/common/generateTimestamp");

module.exports = {
  getAllPosts: async (user_id) => {
    try {
      const query = `
        SELECT 
          p.post_id,
          p.caption,
          p.post_visibility,
          p.allow_comments,
          p.allow_likes,
          p.is_active,
          p.created_at AS post_created_at,
          COALESCE(
            json_agg(
              DISTINCT jsonb_build_object(
                'image_id', pi.image_id,
                'image_url', pi.image_url,
                'is_active', pi.is_active,
                'created_at', pi.created_at
              )
            ) FILTER (WHERE pi.image_id IS NOT NULL), '[]'
          ) AS images,
          COALESCE(
            json_agg(
              DISTINCT jsonb_build_object(
                'tag_id', pt.tag_id,
                'tag_name', pt.tag_name,
                'created_at', pt.created_at
              )
            ) FILTER (WHERE pt.tag_id IS NOT NULL), '[]'
          ) AS tags,
          COALESCE(
            json_agg(
              DISTINCT jsonb_build_object(
                'comment_id', pc.comment_id,
                'user_id', pc.user_id,
                'comment_text', pc.comment_text,
                'is_active', pc.is_active,
                'created_at', pc.created_at
              )
            ) FILTER (WHERE pc.comment_id IS NOT NULL), '[]'
          ) AS comments,
          (SELECT COUNT(*) FROM tbl_post_likes pl WHERE pl.post_id = p.post_id) AS like_count
        FROM 
          tbl_posts p
        LEFT JOIN 
          tbl_post_images pi ON pi.post_id = p.post_id
        LEFT JOIN 
          tbl_post_tags pt ON pt.post_id = p.post_id
        LEFT JOIN 
          tbl_post_comments pc ON pc.post_id = p.post_id
        WHERE 
          p.user_id = $1 AND p.is_active = TRUE
        GROUP BY 
          p.post_id
        ORDER BY 
          p.created_at DESC;
      `;
      const { rows } = await client.query(query, [user_id]);
      return rows;
    } catch (error) {
      throw new Error(error.message);
    }
  },
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
