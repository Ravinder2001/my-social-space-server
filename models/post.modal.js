const client = require("../config/db");

module.exports = {
  AddPost: ({ id, user_id, caption }) => {
    return new Promise(function (resolve, reject) {
      try {
        const response = client.query(`INSERT INTO posts(id,user_id,caption) VALUES ($1,$2,$3)`, [id, user_id, caption]);
        resolve(response);
      } catch (err) {
        reject(err);
      }
    });
  },
  AddPostImages: ({ post_id, image }) => {
    return new Promise(function (resolve, reject) {
      try {
        const response = client.query(`INSERT INTO post_images (post_id,image_url) VALUES($1,$2)`, [post_id, image]);
        resolve(response);
      } catch (err) {
        reject(err);
      }
    });
  },
  AddPostPrivacy: ({ post_id, comment, like, share, visibility }) => {
    return new Promise(function (resolve, reject) {
      try {
        const response = client.query(
          `INSERT INTO post_privacy (post_id,comment_allowed,like_allowed,share_allowed,visibility) 
          VALUES($1,$2,$3,$4,$5)`,
          [post_id, comment, like, share, visibility]
        );
        resolve(response);
      } catch (err) {
        reject(err);
      }
    });
  },
  GetPostSelf: ({ user_id }) => {
    return new Promise(function (resolve, reject) {
      try {
        const response = client.query(
          `SELECT posts.user_id,users.name AS user_name,profile_pictures.image_url as profile_picture,
          posts.id AS post_id,posts.caption,posts.created_at,post_privacy.visibility,COUNT (likes.id) as likes_count,
          (SELECT COUNT(likes.id) as user_like FROM likes WHERE likes.user_id = $1),
          CASE WHEN COUNT(post_images.post_id)>0 THEN ARRAY_AGG(DISTINCT JSONB_BUILD_OBJECT('image_url',post_images.image_url))
          ELSE ARRAY[]::JSONB[] END AS images
          FROM posts 
          LEFT JOIN post_images ON post_images.post_id=posts.id 
          LEFT JOIN users ON users.id=posts.user_id 
          LEFT JOIN profile_pictures ON profile_pictures.user_id=users.id
          LEFT JOIN post_privacy ON post_privacy.post_id=posts.id
          LEFT JOIN likes ON likes.post_id=posts.id
          WHERE posts.user_id=$1 AND users.status=true
          GROUP BY users.name,posts.id,posts.caption,posts.created_at,profile_pictures.image_url,post_privacy.visibility
          ORDER BY posts.created_at DESC`,
          [user_id]
        );
        resolve(response);
      } catch (err) {
        reject(err);
      }
    });
  },
  GetPostOfAnotherUser: ({ user_id }) => {
    return new Promise(function (resolve, reject) {
      try {
        const response = client.query(
          `SELECT posts.user_id,users.name AS user_name,profile_pictures.image_url as profile_picture,posts.id AS post_id,posts.caption,posts.created_at,
          post_privacy.like_allowed,post_privacy.comment_allowed,COUNT (likes.id) as likes_count,
          post_privacy.share_allowed, (SELECT COUNT(likes.id) as user_like FROM likes WHERE likes.user_id = $1),
          CASE WHEN COUNT(post_images.post_id)>0 THEN ARRAY_AGG(DISTINCT JSONB_BUILD_OBJECT('image_url',post_images.image_url))
          ELSE ARRAY[]::JSONB[] END AS images
          FROM posts 
          LEFT JOIN post_images ON post_images.post_id=posts.id 
          LEFT JOIN users ON users.id=posts.user_id 
          LEFT JOIN profile_pictures ON profile_pictures.user_id=users.id
          LEFT JOIN post_privacy ON post_privacy.post_id=posts.id
          LEFT JOIN likes ON likes.post_id=posts.id
          WHERE posts.user_id=$1 AND users.status=true AND post_privacy.visibility!='private'
          GROUP BY users.name,posts.id,posts.caption,posts.created_at,profile_pictures.image_url,post_privacy.like_allowed,post_privacy.comment_allowed,
          post_privacy.share_allowed
          ORDER BY posts.created_at DESC`,
          [user_id]
        );
        resolve(response);
      } catch (err) {
        reject(err);
      }
    });
  },
  GetPostByUserId: ({ user_id }) => {
    return new Promise(function (resolve, reject) {
      try {
        const response = client.query(
          `SELECT posts.user_id,users.name AS user_name,profile_pictures.image_url as profile_picture,
          posts.id AS post_id,posts.caption,posts.created_at,post_privacy.like_allowed,post_privacy.comment_allowed,
          post_privacy.share_allowed,COUNT (likes.id) as likes_count, (SELECT COUNT(likes.id) as user_like FROM likes WHERE likes.user_id = $1),
          CASE WHEN COUNT(post_images.post_id)>0 THEN ARRAY_AGG(DISTINCT JSONB_BUILD_OBJECT('image_url',post_images.image_url))
          ELSE ARRAY[]::JSONB[] END AS images
          FROM posts 
          LEFT JOIN post_images ON post_images.post_id=posts.id 
          LEFT JOIN users ON users.id=posts.user_id 
          LEFT JOIN profile_pictures ON profile_pictures.user_id=users.id
          LEFT JOIN friends ON friends.user1_id=users.id OR friends.user2_id=users.id
          LEFT JOIN post_privacy ON post_privacy.post_id=posts.id 
          LEFT JOIN likes ON likes.post_id=posts.id 
          WHERE (users.id = $1 
          OR friends.user1_id = $1
          OR friends.user2_id = $1)
          AND users.status=true 
          AND (friends.status IS Null OR friends.status=true)
          AND post_privacy.visibility != 'private'
          GROUP BY users.name,posts.id,posts.caption,posts.created_at,profile_pictures.image_url,post_privacy.like_allowed,post_privacy.comment_allowed,
          post_privacy.share_allowed
          ORDER BY posts.created_at DESC`,
          [user_id]
        );
        resolve(response);
      } catch (err) {
        reject(err);
      }
    });
  },
  GetComments: ({ post_id }) => {
    return new Promise(function (resolve, reject) {
      try {
        const response = client.query(
          `SELECT comments.id as comment_id,comments.user_id,posts.user_id as post_admin,users.name as user_name,profile_pictures.image_url,comments.content,comments.created_at
          FROM comments 
          LEFT JOIN users ON users.id=comments.user_id
          LEFT JOIN profile_pictures ON profile_pictures.user_id=users.id
          LEFT JOIN posts ON posts.id=comments.post_id
          WHERE post_id=$1 ORDER BY comments.created_at DESC`,
          [post_id]
        );
        resolve(response);
      } catch (err) {
        reject(err);
      }
    });
  },
  GetLikes: ({ post_id }) => {
    return new Promise(function (resolve, reject) {
      try {
        const response = client.query(
          `SELECT users.id,users.name as user_name,profile_pictures.image_url
          FROM likes 
          LEFT JOIN users ON users.id=likes.user_id
          LEFT JOIN profile_pictures ON profile_pictures.user_id=users.id
          WHERE post_id=$1`,
          [post_id]
        );
        resolve(response);
      } catch (err) {
        reject(err);
      }
    });
  },
  DeletePost: ({ post_id, user_id }) => {
    return new Promise(function (resolve, reject) {
      try {
        const response = client.query(`DELETE FROM posts WHERE id=$1 AND user_id=$2`, [post_id, user_id]);
        resolve(response);
      } catch (err) {
        reject(err);
      }
    });
  },
  AddComment: ({ post_id, user_id, content }) => {
    return new Promise(function (resolve, reject) {
      try {
        const response = client.query(`INSERT INTO comments(post_id,user_id,content) VALUES($1,$2,$3)`, [post_id, user_id, content]);
        resolve(response);
      } catch (err) {
        reject(err);
      }
    });
  },
  AddLike: ({ post_id, user_id }) => {
    return new Promise(function (resolve, reject) {
      try {
        const response = client.query(`INSERT INTO likes(post_id,user_id) VALUES($1,$2)`, [post_id, user_id]);
        resolve(response);
      } catch (err) {
        reject(err);
      }
    });
  },
  RemoveLike: ({ post_id, user_id }) => {
    return new Promise(function (resolve, reject) {
      try {
        const response = client.query(`DELETE FROM likes WHERE post_id=$1 AND user_id=$2`, [post_id, user_id]);
        resolve(response);
      } catch (err) {
        reject(err);
      }
    });
  },
  FindPostById: ({ id }) => {
    return new Promise((resolve, reject) => {
      try {
        const response = client.query(`SELECT id FROM posts WHERE id=$1`, [id]);
        resolve(response);
      } catch (err) {
        reject(err);
      }
    });
  },
  GetPostWithPostId: ({ post_id }) => {
    return new Promise((resolve, reject) => {
      try {
        const response = client.query(
          `SELECT posts.user_id,users.name AS user_name,profile_pictures.image_url as profile_picture,posts.id AS post_id,posts.caption,posts.created_at,
          post_privacy.like_allowed,post_privacy.comment_allowed,post_privacy.share_allowed,COUNT (likes.id) as likes_count, (SELECT COUNT(likes.id) as user_like FROM likes WHERE likes.user_id = $1),
          ARRAY_AGG(DISTINCT JSONB_BUILD_OBJECT('image_url',post_images.image_url)) as images
         FROM posts 
          LEFT JOIN post_images ON post_images.post_id=posts.id 
          LEFT JOIN users ON users.id=posts.user_id
          LEFT JOIN profile_pictures ON profile_pictures.user_id=users.id
          LEFT JOIN post_privacy ON post_privacy.post_id=posts.id
          LEFT JOIN likes ON likes.post_id=posts.id
          WHERE posts.id=$1 AND users.status=true
          GROUP BY users.name,posts.id,posts.caption,posts.created_at,profile_pictures.image_url,profile_pictures.image_url,post_privacy.like_allowed,post_privacy.comment_allowed,
          post_privacy.share_allowed`,
          [post_id]
        );
        resolve(response);
      } catch (err) {
        reject(err);
      }
    });
  },
  RemoveComment: ({ comment_id }) => {
    return new Promise((resolve, reject) => {
      try {
        const response = client.query(`DELETE FROM comments WHERE id=$1`, [comment_id]);
        resolve(response);
      } catch (err) {
        reject(err);
      }
    });
  },
  FetchEditDetailsOfPost: ({ post_id }) => {
    return new Promise((resolve, reject) => {
      try {
        const response = client.query(
          `
        SELECT posts.user_id,posts.id AS post_id,posts.caption,posts.created_at,post_privacy.like_allowed,
        post_privacy.comment_allowed,post_privacy.share_allowed,post_privacy.visibility,
        ARRAY_AGG(DISTINCT JSONB_BUILD_OBJECT('image_url',post_images.image_url)) as images
        FROM posts 
        LEFT JOIN post_images ON post_images.post_id=posts.id 
        LEFT JOIN post_privacy ON post_privacy.post_id=posts.id
        WHERE posts.id=$1
        GROUP BY posts.id,posts.caption,posts.created_at,post_privacy.like_allowed,post_privacy.comment_allowed,
        post_privacy.share_allowed,post_privacy.visibility`,
          [post_id]
        );
        resolve(response);
      } catch (err) {
        reject(err);
      }
    });
  },
  EditPostCaption: ({ post_id, caption }) => {
    return new Promise((resolve, reject) => {
      try {
        const response = client.query(`UPDATE posts SET caption=$2 WHERE id=$1`, [post_id, caption]);
        resolve(response);
      } catch (err) {
        reject(err);
      }
    });
  },
  EditPostPrivacy: ({ post_id, comment_allowed, like_allowed, share_allowed, visibility }) => {
    return new Promise((resolve, reject) => {
      try {
        const response = client.query(
          `UPDATE post_privacy SET comment_allowed=$2,like_allowed=$3,share_allowed=$4,visibility=$5 
          WHERE post_id=$1`,
          [post_id, comment_allowed, like_allowed, share_allowed, visibility]
        );
        resolve(response);
      } catch (err) {
        reject(err);
      }
    });
  },
  GetLikesCount: ({ post_id }) => {
    return new Promise((resolve, reject) => {
      try {
        const response = client.query(`SELECT user_id FROM likes WHERE post_id=$1`, [post_id]);
        resolve(response);
      } catch (err) {
        reject(err);
      }
    });
  },
  GetFriendsIdByPostId: ({ post_id }) => {
    return new Promise((resolve, reject) => {
      try {
        const response = client.query(`
        WITH PostUser AS (
          SELECT user_id
          FROM posts
          WHERE id = $1
        )
        SELECT DISTINCT 
          CASE 
              WHEN friends.user1_id = PostUser.user_id THEN friends.user2_id
              ELSE friends.user1_id
          END AS friend_id
        FROM friends
        JOIN PostUser ON friends.user1_id = PostUser.user_id OR friends.user2_id = PostUser.user_id;
      `, [post_id]);
        resolve(response);
      } catch (err) {
        reject(err);
      }
    });
  },
};
