const client = require("../configuration/db");

module.exports = {
  register: async (values) => {
    try {
      const { username, email, password, full_name, gender } = values;

      const query = `
        INSERT INTO tbl_users 
        (username, email, password, full_name, gender, profile_picture) 
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING *;
      `;

      const params = [username, email, password, full_name, gender, "USER-1/23732644-cb9b-43ab-ac72-5e6e9eb2eea0.png"];

      const result = await client.query(query, params);

      return result.rows[0];
    } catch (error) {
      console.error("Error in registering user:", error.message);
      throw error;
    }
  },
  getUserDetailsByEmail: async (email) => {
    try {
      const query = `SELECT * FROM tbl_users WHERE email = $1`;

      const params = [email];

      const result = await client.query(query, params);

      return result.rows[0];
    } catch (error) {
      console.error("Error in registering user:", error.message);
      throw error;
    }
  },
  getUserDetailsByID: async (user_id) => {
    try {
      const query = `SELECT * FROM tbl_users WHERE user_id = $1`;

      const params = [user_id];

      const result = await client.query(query, params);

      return result.rows[0];
    } catch (error) {
      console.error("Error in registering user:", error.message);
      throw error;
    }
  },
  usernameExists: async (username) => {
    try {
      const query = `SELECT * FROM tbl_users WHERE username = $1`;

      const params = [username];

      const result = await client.query(query, params);

      return result.rows.length > 0;
    } catch (error) {
      console.error("Error in checking username:", error.message);
      throw error;
    }
  },
};
