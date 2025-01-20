const client = require("../configuration/db");
// const generateTimestamp = require("../utils/common/generateTimestamp");

module.exports = {
  getAllPosts: async (values) => {
    try {
      const query = `
      WITH friend_posts AS (
  SELECT 
    p.post_id, 
    p.user_id, 
    p.caption, 
    p.post_visibility, 
    p.allow_comments, 
    p.allow_likes, 
    p.created_at
  FROM tbl_posts p
  LEFT JOIN tbl_friends f
    ON (f.user1_id = p.user_id AND f.user2_id = $1)
    OR (f.user2_id = p.user_id AND f.user1_id = $1)
  WHERE p.is_active = TRUE
    AND (p.post_visibility = 'PUBLIC' OR f.is_active = TRUE)
),
likes_count AS (
  SELECT 
    post_id, 
    COUNT(*) AS total_likes
  FROM tbl_post_likes
  GROUP BY post_id
),
latest_comment AS (
  SELECT 
    pc.post_id, 
    pc.comment_text, 
    pc.created_at AS comment_created_at,
    pc.user_id
  FROM tbl_post_comments pc
  WHERE pc.is_active = TRUE
  AND pc.comment_id IN (
    SELECT 
      MAX(comment_id)
    FROM tbl_post_comments
    GROUP BY post_id
  )
),
post_images AS (
  SELECT 
    i.post_id, 
    ARRAY_AGG(i.image_url) AS image_urls,
    COUNT(i.image_id) AS image_count
  FROM tbl_post_images i
  WHERE i.is_active = TRUE
  GROUP BY i.post_id
)
SELECT 
  fp.post_id,
  u.full_name,
  u.profile_picture AS user_profile_picture,
  fp.caption,
  fp.post_visibility,
  fp.allow_comments,
  fp.allow_likes,
  fp.created_at,
  COALESCE(lc.total_likes, 0) AS likes_count,
  COALESCE(lc2.comment_text, '') AS latest_comment,
  COALESCE(uc.profile_picture, '') AS latest_comment_user_profile_picture,
  CASE 
    WHEN pi.image_count > 2 THEN ARRAY(SELECT unnest(pi.image_urls) LIMIT 2)
    ELSE pi.image_urls
  END AS images,
  CASE 
    WHEN pi.image_count > 2 THEN pi.image_count - 2
    ELSE 0
  END AS remaining_image_count
FROM friend_posts fp
LEFT JOIN likes_count lc ON fp.post_id = lc.post_id
LEFT JOIN latest_comment lc2 ON fp.post_id = lc2.post_id
LEFT JOIN tbl_users uc ON lc2.user_id = uc.user_id -- Join to get profile picture of the commenter
LEFT JOIN post_images pi ON fp.post_id = pi.post_id
LEFT JOIN tbl_users u ON fp.user_id = u.user_id
ORDER BY fp.created_at DESC
LIMIT $2 OFFSET $3;

      `;

      const { rows } = await client.query(query, [values.user_id, values.limit, values.offset]);
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
        postDetails.postVisibility,
        postDetails.allowComments,
        postDetails.allowLikes,
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
