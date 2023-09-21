const client = require("../config/db");

module.exports = {
  CreateRoom: ({ id, type, name, image_url }) => {
    return new Promise(function (resolve, reject) {
      try {
        const response = client.query(
          `INSERT INTO message_room(id,type,name,image_url) VALUES ($1,$2,$3,$4)`,
          [id, type, name, image_url]
        );
        resolve(response);
      } catch (err) {
        reject(err);
      }
    });
  },
  AddMembers: ({ room_id, user_id, ismessageallowed }) => {
    return new Promise(function (resolve, reject) {
      try {
        const response = client.query(
          `INSERT INTO room_members(room_id,user_id,ismessageallowed) VALUES ($1,$2,$3)`,
          [room_id, user_id, ismessageallowed]
        );
        resolve(response);
      } catch (err) {
        reject(err);
      }
    });
  },
  GetRoomsByUserId: ({ user_id }) => {
    return new Promise(function (resolve, reject) {
      try {
        const response = client.query(
          `SELECT room_members.room_id,
          CASE
              WHEN message_room.type = 1 THEN users.name
              WHEN message_room.type = 2 THEN message_room.name
          END AS user_name,
          CASE
              WHEN message_room.type = 1 THEN profile_pictures.image_url
              WHEN message_room.type = 2 THEN message_room.image_url
          END AS image_url,
          last_message.created_at AS last_message_timestamp,
          last_message.content AS last_message_content
      FROM room_members
      JOIN message_room ON room_members.room_id = message_room.id
      LEFT JOIN users ON room_members.user_id = users.id
      LEFT JOIN profile_pictures ON users.id = profile_pictures.user_id
      LEFT JOIN (
          SELECT room_id, MAX(created_at) AS max_created_at
          FROM messages
          GROUP BY room_id
      ) AS last_message_timestamps ON room_members.room_id = last_message_timestamps.room_id
      LEFT JOIN messages AS last_message ON last_message.created_at = last_message_timestamps.max_created_at AND room_members.room_id = last_message.room_id
      WHERE room_members.room_id IN (
          SELECT room_id
          FROM room_members
          WHERE user_id = $1
      )
      AND (message_room.type = 1 OR message_room.type = 2)
      AND room_members.user_id != $1
      ORDER BY last_message_timestamp DESC`,
          [user_id]
        );
        resolve(response);
      } catch (err) {
        reject(err);
      }
    });
  },
  SendMessage: ({ room_id, sender_id, content, content_type }) => {
    return new Promise(function (resolve, reject) {
      try {
        const response = client.query(
          `INSERT INTO messages(room_id,sender_id,content,content_type) VALUES($1,$2,$3,$4)`,
          [room_id, sender_id, content, content_type]
        );
        resolve(response);
      } catch (err) {
        reject(err);
      }
    });
  },
  GetRoomDetails: ({ room_id, user_id }) => {
    return new Promise(function (resolve, reject) {
      try {
        const response = client.query(
          `SELECT
          type,
          CASE
              WHEN message_room.type = 1 THEN users.name
              WHEN message_room.type = 2 THEN message_room.name
          END AS user_name,
          CASE
              WHEN message_room.type = 1 THEN users.id
          END AS second_user_id,
          CASE
              WHEN message_room.type = 1 THEN profile_pictures.image_url
              WHEN message_room.type = 2 THEN message_room.image_url
          END AS image_url,
          CASE
              WHEN message_room.type = 2 THEN ARRAY_AGG(users.name)
              ELSE ARRAY[null]::VARCHAR[]
          END AS members_name
      FROM room_members
      JOIN message_room ON room_members.room_id = message_room.id
      LEFT JOIN users ON room_members.user_id = users.id
      LEFT JOIN profile_pictures ON users.id = profile_pictures.user_id
      WHERE room_members.room_id = $1
      AND (message_room.type = 1 OR message_room.type = 2) AND room_members.user_id != $2
      GROUP BY users.name,second_user_id,profile_pictures.image_url,message_room.image_url,room_members.room_id, message_room.type, message_room.name;`,
          [room_id, user_id]
        );
        resolve(response);
      } catch (err) {
        reject(err);
      }
    });
  },
  GetRoomMessages: ({ room_id }) => {
    return new Promise(function (resolve, reject) {
      try {
        const response = client.query(
          `SELECT id,sender_id,content,content_type,created_at,status FROM messages WHERE messages.room_id=$1`,
          [room_id]
        );
        resolve(response);
      } catch (err) {
        reject(err);
      }
    });
  },
  UpdateMessageSeenTime: ({ room_id, receiver_id }) => {
    return new Promise(function (resolve, reject) {
      try {
        const response = client.query(
          `UPDATE messages SET seen_at=CURRENT_TIMESTAMP
          WHERE messages.room_id=$1 AND messages.sender_id != $2 AND messages.seen_at IS NULL`,
          [room_id, receiver_id]
        );
        resolve(response);
      } catch (err) {
        reject(err);
      }
    });
  },
};
