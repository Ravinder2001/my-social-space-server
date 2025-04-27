const client = require("../configuration/db");
// const { removeFilesFromTrash } = require("./upload.model");

module.exports = {
  getAllPosts: async (user_id) => {
    try {
      const postResults = await client.query(
        `
        SELECT
          p.post_id,
          p.user_id,
          p.caption,
          u.full_name AS user_name,
          u.profile_picture,
          p.visibility,
          p.created_at,
          COALESCE(
              (SELECT jsonb_agg(pi.image_url)
               FROM tbl_post_images pi
               WHERE pi.post_id = p.post_id
              ), '[]'::jsonb
          ) AS images,
          (SELECT COUNT(*) 
           FROM tbl_comments c 
           WHERE c.post_id = p.post_id
          ) AS comment_count,
          COALESCE(
              (SELECT COUNT(*) 
               FROM tbl_post_likes pl 
               WHERE pl.post_id = p.post_id
              ), 0
          ) AS like_count,
          EXISTS (
              SELECT 1 
              FROM tbl_post_likes pl 
              WHERE pl.post_id = p.post_id 
              AND pl.user_id = $1
          ) AS is_liked,
          FALSE AS is_saved, -- No saved posts check needed for own posts
          (
              SELECT jsonb_build_object(
                  'user_name', cu.full_name,
                  'profile_picture', cu.profile_picture,
                  'content', c.content
              )
              FROM tbl_comments c
              JOIN tbl_users cu ON c.user_id = cu.user_id
              WHERE c.post_id = p.post_id
              ORDER BY c.created_at DESC
              LIMIT 1
          ) AS latest_comment
        FROM tbl_posts p
        JOIN tbl_users u ON p.user_id = u.user_id
        WHERE 
          p.user_id = $1
          AND p.visibility IN ('PUBLIC', 'FRIENDS', 'PRIVATE')
        ORDER BY p.created_at DESC;
        `,
        [user_id]
      );

      return postResults.rows;
    } catch (error) {
      console.error("Error in getting own posts:", error.message);
      throw error;
    }
  },
  getAllPhotos: async (user_id) => {
    try {
      const postResults = await client.query(
        `
        SELECT
          pi.image_id AS id,
          pi.image_url AS image,
          COALESCE(
            (SELECT COUNT(*)
             FROM tbl_post_likes pl
             WHERE pl.post_id = pi.post_id
            ), 0
          ) AS likes,
          COALESCE(
            (SELECT COUNT(*)
             FROM tbl_comments c
             WHERE c.post_id = pi.post_id
            ), 0
          ) AS comments
        FROM tbl_post_images pi
        JOIN tbl_posts p ON pi.post_id = p.post_id
        WHERE p.user_id = $1
        ORDER BY pi.created_at DESC;
        `,
        [user_id]
      );

      return postResults.rows;
    } catch (error) {
      console.error("Error in getting own photos:", error.message);
      throw error;
    }
  },
  getAllSavedPosts: async (user_id) => {
    try {
      const postResults = await client.query(
        `
SELECT
    p.post_id AS id,
    p.caption AS caption,
    (
        SELECT pi.image_url
        FROM tbl_post_images pi
        WHERE pi.post_id = p.post_id
        ORDER BY pi.image_id ASC -- Assuming lower ID = earlier image
        LIMIT 1
    ) AS image,
    COALESCE(
        (SELECT COUNT(*)
         FROM tbl_post_likes pl
         WHERE pl.post_id = p.post_id
        ), 0
    ) AS likes,
    (SELECT COUNT(*)
     FROM tbl_comments c
     WHERE c.post_id = p.post_id
    ) AS comments,
    p.created_at
FROM tbl_saved_posts sp
JOIN tbl_posts p ON sp.post_id = p.post_id
WHERE 
    sp.user_id = $1
    AND p.visibility = 'PUBLIC'
ORDER BY sp.saved_at DESC;

        `,
        [user_id]
      );

      return postResults.rows;
    } catch (error) {
      console.error("Error in getting saved posts:", error.message);
      throw error;
    }
  },
};
