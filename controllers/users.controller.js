const { encrypt } = require("../helpers/password_hashed/password_hashed");
const { Login_User, Register_User } = require("../models/users.model");
const { v4: uuidv4 } = require("uuid");

module.exports = {
  Register_User_Controller: async (req, res) => {
    try {
      let hashedPassword = await encrypt(req.body.password);
      const response = await Register_User({
        id: uuidv4(),
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
      });
      res.status(200).json({ data: response.rows, status: 200 });
    } catch (err) {
      res.status(404).json({ message: err.message, status: 404 });
    }
  },
  Login_User_Controller: async (req, res) => {
    try {
      const response = await Login_User();
      res.status(200).json({ data: response.rows, status: 200 });
    } catch (err) {
      res.status(404).json({ message: err.message, status: 404 });
    }
  },
};
