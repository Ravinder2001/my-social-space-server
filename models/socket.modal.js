const client = require("../config/db");

module.exports = {
  Add_Socket_User: ({ user_id, socket_id }) => {
    return new Promise(function (resolve, reject) {
      try {
        const upsertQuery = `
          INSERT INTO user_socket(user_id, socket_id)
          VALUES ($1, $2)
          ON CONFLICT (user_id)
          DO UPDATE SET socket_id = $2, created_at = CURRENT_TIMESTAMP
          RETURNING *;
        `;
        const response = client.query(upsertQuery, [user_id, socket_id]);
        resolve(response);
      } catch (err) {
        reject(err);
      }
    });
  },
  Get_UserId_By_Socket: ({ socket_id }) => {
    return new Promise(function (resolve, reject) {
      try {
        const upsertQuery = client.query(`SELECT user_id FROM user_socket WHERE socket_id=$1`, [socket_id]);
        resolve(upsertQuery);
      } catch (err) {
        reject(err);
      }
    });
  },
  Get_SocketId_By_UserId: ({ user_id }) => {
    return new Promise(function (resolve, reject) {
      try {
        const upsertQuery = client.query(`SELECT socket_id FROM user_socket WHERE user_id=$1`, [user_id]);
        resolve(upsertQuery);
      } catch (err) {
        reject(err);
      }
    });
  },
  Get_Friends_UserId:({user_id})=>{
    return new Promise(function (resolve, reject) {
      try {
        const response = client.query(`
        SELECT room_members.user_id FROM message_room 
        LEFT JOIN room_members ON room_members.room_id=message_room.id 
        LEFT JOIN user_online_status ON user_online_status.user_id=room_members.user_id
        WHERE room_members.user_id != $1 AND user_online_status.status=true
        `, [user_id]);
        resolve(response);
      } catch (err) {
        reject(err);
      }
    });
  }
};
