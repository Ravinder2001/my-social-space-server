const client = require("../config/db");

module.exports = {
  AddStory: ({ user_id, image_url, song, start_time, end_time }) => {
    return new Promise(function (resolve, reject) {
      try {
        const response = client.query(`INSERT INTO story(user_id,image_url,song,start_time,end_time) VALUES ($1,$2,$3,$4,$5)`, [
          user_id,
          image_url,
          song,
          parseInt(start_time),
          parseInt(end_time),
        ]);
        resolve(response);
      } catch (err) {
        reject(err);
      }
    });
  },
  DeleteStory: ({ story_id, user_id }) => {
    return new Promise(function (resolve, reject) {
      try {
        const response = client.query(`DELETE FROM story WHERE id=$1 AND user_id=$2`, [story_id, user_id]);
        resolve(response);
      } catch (err) {
        reject(err);
      }
    });
  },
  FindStoryById: ({ story_id,user_id }) => {
    return new Promise(function (resolve, reject) {
      try {
        const response = client.query(`SELECT image_url FROM story WHERE id=$1 AND user_id=$2`, [story_id,user_id]);
        resolve(response);
      } catch (err) {
        reject(err);
      }
    });
  },
  FindStoryByUserId: ({ user_id }) => {
    return new Promise(function (resolve, reject) {
      try {
        const response = client.query(`SELECT id,image_url as story_image,song,start_time,end_time,created_at FROM story WHERE user_id=$1`, [user_id]);
        resolve(response);
      } catch (err) {
        reject(err);
      }
    });
  },
  GetAllStory: ({ user_id }) => {
    return new Promise(function (resolve, reject) {
      try {
        const response = client.query(
          `
          SELECT 
          friends.user1_id as user_id,
          users.name as username,
          profile_pictures.image_url as profile_picture,
          json_agg(
            json_build_object(
              'id', story.id,
              'story_image', story.image_url,
              'song', story.song,
              'start_time', story.start_time,
              'end_time', story.end_time,
              'created_at', story.created_at
            )
          ) as story
        FROM friends
        JOIN story ON (friends.user1_id = story.user_id AND friends.user2_id = $1)
                      OR (friends.user2_id = story.user_id AND friends.user1_id = $1)
        LEFT JOIN profile_pictures ON profile_pictures.user_id = 
              CASE
                  WHEN friends.user1_id = $1 THEN friends.user2_id
                  WHEN friends.user2_id = $1 THEN friends.user1_id
              END
        LEFT JOIN users ON users.id=
              CASE
                  WHEN friends.user1_id = $1 THEN friends.user2_id
                  WHEN friends.user2_id = $1 THEN friends.user1_id
              END
        WHERE friends.status = true
        GROUP BY friends.user1_id, profile_pictures.image_url, users.name;
        
        `,
          [user_id]
        );
        resolve(response);
      } catch (err) {
        reject(err);
      }
    });
  },
};
