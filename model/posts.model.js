const client = require("../configuration/db");
const generateTimestamp = require("../utils/common/generateTimestamp");

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
  getPostById:async (values) => {
    try {
      // First query to get post details and like count
      const postQuery = `
        SELECT 
          p.post_id,
          u.profile_picture AS post_user_profile_picture,
          u.full_name AS post_user_name,
          p.caption,
          p.allow_comments,
          p.allow_likes,
          p.is_active,
          p.created_at AS post_created_at,
          COUNT(pl.like_id) AS like_count
        FROM 
          tbl_posts p
        LEFT JOIN 
          tbl_post_likes pl ON pl.post_id = p.post_id
        LEFT JOIN
          tbl_users u ON u.user_id = p.user_id
        WHERE 
          p.post_id = $1
        GROUP BY 
          p.post_id, u.profile_picture, u.full_name
      `;
  
      // Second query to get all images
      const imagesQuery = `
        SELECT
          image_url
        FROM 
          tbl_post_images
        WHERE 
          post_id = $1;
      `;
  
      // Third query to get all comments with user details
      const commentsQuery = `
        SELECT 
          pc.comment_id,
          pc.comment_text,
          pc.created_at AS comment_created_at,
          u.full_name AS username,
          u.profile_picture
        FROM 
          tbl_post_comments pc
        LEFT JOIN 
          tbl_users u ON u.user_id = pc.user_id
        WHERE 
          pc.post_id = $1
        ORDER BY 
          pc.created_at DESC;
      `;
  
      // Execute all queries concurrently
      const [postResult, imagesResult, commentsResult] = await Promise.all([
        client.query(postQuery, [values.post_id]),
        client.query(imagesQuery, [values.post_id]),
        client.query(commentsQuery, [values.post_id])
      ]);
  
      // If post doesn't exist, return null
      if (postResult.rows.length === 0) {
        return null;
      }
  
      // Construct the final response
      const response = {
        ...postResult.rows[0],
        images: imagesResult.rows.map(image => image.image_url),
        comments: commentsResult.rows.map(comment => ({
          comment_id: comment.comment_id,
          comment_text: comment.comment_text,
          created_at: comment.comment_created_at,
          user: {
            username: comment.username,
            profile_picture: comment.profile_picture
          }
        }))
      };
  
      return response;
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
  toggleLikes: async (values) => {
    try {
      const query = `
        WITH deleted AS (
          DELETE FROM tbl_post_likes 
          WHERE post_id = $1 AND user_id = $2
          RETURNING *
        )
        INSERT INTO tbl_post_likes (post_id, user_id, created_at)
        SELECT $1, $2, $3
        WHERE NOT EXISTS (SELECT 1 FROM deleted);
      `;

      await client.query(query, [values.post_id, values.user_id, generateTimestamp()]);
    } catch (error) {
      throw new Error(error.message);
    }
  },
  addComment: async (values) => {
    try {
      const query = `
        INSERT INTO tbl_post_comments (post_id, user_id, comment_text, created_at)
        VALUES ($1, $2, $3, $4);
      `;

      await client.query(query, [values.post_id, values.user_id, values.comment, generateTimestamp()]);
    } catch (error) {
      throw new Error(error.message);
    }
  },
};
