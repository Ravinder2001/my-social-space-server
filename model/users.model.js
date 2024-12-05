const client = require("../configuration/db");

module.exports = {
  register: async (values) => {
    try {
      const { username, email, password, full_name, gender } = values;

      const query = `
        INSERT INTO tbl_users 
        (username, email, password, full_name, gender) 
        VALUES ($1, $2, $3, $4, $5)
        RETURNING user_id, username;
      `;

      const params = [username, email, password, full_name, gender];

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
};
