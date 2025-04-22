const client = require("../configuration/db");

module.exports = {
  createPost: async (values) => {
    try {
      const { user_id, caption, visibility, images = [] } = values;

      // Start a transaction
      await client.query("BEGIN");

      // Insert post
      const postQuery = `
        INSERT INTO tbl_posts 
        (user_id, caption, visibility) 
        VALUES ($1, $2, $3)
        RETURNING post_id, user_id, caption, visibility, created_at;
      `;
      const postParams = [user_id, caption, visibility];
      const postResult = await client.query(postQuery, postParams);
      const post = postResult.rows[0];

      if (images.length > 0) {
        const imageQuery = `
          INSERT INTO tbl_post_images 
          (post_id, image_url) 
          VALUES ($1, $2)
          RETURNING image_id, image_url;
        `;
        for (const image_url of images) {
          await client.query(imageQuery, [post.post_id, image_url]);
        }
      }

      await client.query("COMMIT");

      return;
    } catch (error) {
      await client.query("ROLLBACK");
      console.error("Error in creating post:", error.message);
      throw error;
    }
  },

  deletePost: async (post_id, user_id) => {
    try {
      const query = `
        DELETE FROM tbl_posts 
        WHERE post_id = $1 AND user_id = $2
        RETURNING post_id;
      `;
      const params = [post_id, user_id];
      const result = await client.query(query, params);

      if (result.rows.length === 0) {
        throw new Error("Post not found or user not authorized");
      }

      return;
    } catch (error) {
      console.error("Error in deleting post:", error.message);
      throw error;
    }
  },

  editPost: async (values) => {
    try {
      const { post_id, user_id, caption, visibility } = values;

      const query = `
        UPDATE tbl_posts 
        SET caption = $1, visibility = $2, updated_at = CURRENT_TIMESTAMP
        WHERE post_id = $3 AND user_id = $4
        RETURNING post_id, caption, visibility, updated_at;
      `;
      const params = [caption, visibility, post_id, user_id];
      await client.query(query, params);

      return;
    } catch (error) {
      console.error("Error in editing post:", error.message);
      throw error;
    }
  },

  toggleLike: async (post_id, user_id) => {
    try {
      // Check if like exists
      const checkQuery = `
        SELECT like_id 
        FROM tbl_post_likes 
        WHERE post_id = $1 AND user_id = $2;
      `;
      const checkResult = await client.query(checkQuery, [post_id, user_id]);

      if (checkResult.rows.length > 0) {
        // Like exists, remove it
        const deleteQuery = `
          DELETE FROM tbl_post_likes 
          WHERE post_id = $1 AND user_id = $2
          RETURNING like_id;
        `;
        await client.query(deleteQuery, [post_id, user_id]);
        return {
          message: "Like removed successfully",
        };
      } else {
        // Like doesn't exist, add it
        const insertQuery = `
          INSERT INTO tbl_post_likes 
          (post_id, user_id) 
          VALUES ($1, $2)
          RETURNING like_id, post_id, user_id;
        `;
        await client.query(insertQuery, [post_id, user_id]);
        return {
          message: "Like added successfully",
        };
      }
    } catch (error) {
      console.error("Error in toggling like:", error.message);
      throw error;
    }
  },

  addComment: async (values) => {
    try {
      const { post_id, user_id, content } = values;

      const query = `
        INSERT INTO tbl_comments 
        (post_id, user_id, content) 
        VALUES ($1, $2, $3)
        RETURNING comment_id, post_id, user_id, content, created_at;
      `;
      const params = [post_id, user_id, content];
      await client.query(query, params);

      return;
    } catch (error) {
      console.error("Error in adding comment:", error.message);
      throw error;
    }
  },

  removeComment: async (comment_id, user_id) => {
    try {
      const query = `
        DELETE FROM tbl_comments 
        WHERE comment_id = $1 AND user_id = $2
        RETURNING comment_id;
      `;
      const params = [comment_id, user_id];
      await client.query(query, params);

      return;
    } catch (error) {
      console.error("Error in removing comment:", error.message);
      throw error;
    }
  },

  getPost: async (post_id) => {
    try {
      // Get post details
      const postQuery = `
        SELECT p.post_id, p.user_id, p.caption, p.visibility, p.created_at, p.updated_at,
               COALESCE(l.like_count, 0) as like_count,
               COALESCE(c.comment_count, 0) as comment_count
        FROM tbl_posts p
        LEFT JOIN (
          SELECT post_id, COUNT(*) as like_count
          FROM tbl_post_likes
          GROUP BY post_id
        ) l ON p.post_id = l.post_id
        LEFT JOIN (
          SELECT post_id, COUNT(*) as comment_count
          FROM tbl_comments
          GROUP BY post_id
        ) c ON p.post_id = c.post_id
        WHERE p.post_id = $1;
      `;
      const postResult = await client.query(postQuery, [post_id]);

      if (postResult.rows.length === 0) {
        throw new Error("Post not found");
      }

      // Get post images
      const imagesQuery = `
        SELECT image_id, image_url
        FROM tbl_post_images
        WHERE post_id = $1;
      `;
      const imagesResult = await client.query(imagesQuery, [post_id]);

      const post = postResult.rows[0];
      post.images = imagesResult.rows;

      return post;
    } catch (error) {
      console.error("Error in getting post:", error.message);
      throw error;
    }
  },
};
