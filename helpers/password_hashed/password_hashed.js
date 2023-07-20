const bcrypt = require("bcrypt");
const saltRounds = 10;

module.exports = {
  encrypt: async (password) => {
    try {
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      return hashedPassword;
    } catch (error) {
      console.error("Error hashing password:", error);
      throw error; // You can handle the error as needed or simply rethrow it.
    }
  },
};
