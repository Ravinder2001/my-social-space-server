const client = require("../config/db");
const { messgaePerPage } = require("../utils/constant");

module.exports = {
  CreateRoom: ({ id, type, name }) => {
    return new Promise(function (resolve, reject) {
      try {
        const response = client.query(`INSERT INTO message_room(id,type,name,image_url) VALUES ($1,$2,$3,$4)`, [id, type, name, null]);
        resolve(response);
      } catch (err) {
        reject(err);
      }
    });
  },
  AddMembers: ({ room_id, user_id, ismessageallowed, role }) => {
    return new Promise(function (resolve, reject) {
      try {
        const response = client.query(`INSERT INTO room_members(room_id,user_id,ismessageallowed,role) VALUES ($1,$2,$3,$4)`, [
          room_id,
          user_id,
          ismessageallowed,
          role,
        ]);
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
          `SELECT DISTINCT room_members.room_id,
          CASE
            WHEN message_room.type = 1 THEN users.name
            WHEN message_room.type = 2 THEN message_room.name
          END AS user_name,
          CASE
            WHEN message_room.type = 1 THEN users.id
            WHEN message_room.type = 2 THEN null
          END AS user_id,
          CASE
            WHEN message_room.type = 1 THEN profile_pictures.image_url
            WHEN message_room.type = 2 THEN message_room.image_url
          END AS image_url,
          last_message.created_at AS last_message_timestamp,
          last_message.content AS last_message_content,
          message_room.type
          FROM room_members
          JOIN message_room ON room_members.room_id = message_room.id
          LEFT JOIN users ON room_members.user_id = users.id
          LEFT JOIN profile_pictures ON users.id = profile_pictures.user_id
          LEFT JOIN (
            SELECT room_id, MAX(created_at) AS max_created_at
            FROM messages
            GROUP BY room_id
          ) AS last_message_timestamps ON room_members.room_id = last_message_timestamps.room_id
          LEFT JOIN messages AS last_message ON last_message.created_at = last_message_timestamps.max_created_at
            AND room_members.room_id = last_message.room_id
          WHERE room_members.room_id IN (
            SELECT room_id
            FROM room_members
            WHERE user_id = $1
          )
          AND (message_room.type = 1 OR message_room.type = 2)
          AND room_members.user_id != $1
          ORDER BY last_message_timestamp DESC;
          `,
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
          `INSERT INTO messages(room_id,sender_id,content,content_type) VALUES($1,$2,$3,$4) 
           RETURNING id,content,content_type,created_at,status`,
          [room_id, sender_id, content, content_type]
        );
        resolve(response);
      } catch (err) {
        reject(err);
      }
    });
  },
  GetRoomMembers: ({ room_id }) => {
    return new Promise(function (resolve, reject) {
      try {
        const response = client.query(`
        SELECT room_members.ismessageallowed,room_members.role,users.name,users.id,profile_pictures.image_url
        FROM room_members 
        LEFT JOIN users ON users.id=room_members.user_id
        LEFT JOIN profile_pictures ON profile_pictures.user_id=room_members.user_id
        WHERE room_id=$1`, [room_id]);
        resolve(response);
      } catch (err) {
        reject(err);
      }
    });
  },
  GetRoomMessages: ({ room_id, user_id, page, messagePerPage }) => {
    const messagesPerPage = messagePerPage;
    const offset = page == 1 ? 0 : (page - 1) * messagesPerPage;

    return new Promise(function (resolve, reject) {
      try {
        const response = client.query(
          `SELECT messages.id, messages.content, messages.room_id, messages.sender_id, messages.created_at,messages.content_type,messages.status,messages.isedited
          FROM messages
          LEFT JOIN chat_history ON messages.room_id = chat_history.room_id AND chat_history.user_id= $2
          WHERE
              (chat_history.deleted_at IS NULL OR messages.created_at > chat_history.deleted_at)
              AND messages.room_id = $1
              AND (chat_history.user_id = $2 OR chat_history.user_id IS NULL)
            ORDER BY id DESC
            LIMIT $3 OFFSET $4`,
          [room_id, user_id, messagesPerPage, offset]
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
  UpdateMessageContent: ({ message_id, content, user_id }) => {
    return new Promise(function (resolve, reject) {
      try {
        const response = client.query(
          `UPDATE messages SET content=$2,isEdited=true
          WHERE messages.id=$1 AND messages.sender_id = $3`,
          [message_id, content, user_id]
        );
        resolve(response);
      } catch (err) {
        reject(err);
      }
    });
  },
  UpdateMessageStatus: ({ message_id, status, user_id }) => {
    return new Promise(function (resolve, reject) {
      try {
        console.log(message_id, status, user_id);
        const response = client.query(
          `UPDATE messages SET status=$2
          WHERE messages.id=$1 AND messages.sender_id = $3`,
          [message_id, status, user_id]
        );
        resolve(response);
      } catch (err) {
        reject(err);
      }
    });
  },
  DeleteChatHistory: ({ room_id, user_id }) => {
    return new Promise(function (resolve, reject) {
      try {
        const response = client.query(
          `INSERT INTO chat_history(room_id, user_id)
        VALUES ($1, $2)
        ON CONFLICT (room_id, user_id)
        DO UPDATE SET deleted_at = CURRENT_TIMESTAMP
        `,
          [room_id, user_id]
        );
        resolve(response);
      } catch (err) {
        reject(err);
      }
    });
  },
  UpdateSeenMessage: ({ room_id, user_id, timestamp, id }) => {
    return new Promise(function (resolve, reject) {
      try {
        const response = client.query(
          `WITH upsert AS (
          UPDATE message_seen
          SET message_id=$3,seen_at=$4
          WHERE room_id = $1 AND user_id = $2
          RETURNING *
        )
        INSERT INTO message_seen (room_id, user_id,message_id,seen_at)
        SELECT $1, $2,$3,$4
        WHERE NOT EXISTS (SELECT 1 FROM upsert)
        `,
          [room_id, user_id, id, timestamp]
        );
        resolve(response);
      } catch (err) {
        reject(err);
      }
    });
  },
  GetSeenMessage: ({ room_id, user_id }) => {
    return new Promise(function (resolve, reject) {
      try {
        const response = client.query(`SELECT seen_at,message_id FROM message_seen WHERE room_id=$1 AND user_id=$2`, [room_id, user_id]);
        resolve(response);
      } catch (err) {
        reject(err);
      }
    });
  },
};
