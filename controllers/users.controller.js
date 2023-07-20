const genrateJWT = require("../helpers/JWT/genrateJWT");
const { encrypt } = require("../helpers/password_hashed/password_hashed");
const {
  LoginUser,
  RegisterUser,
  GetPasswordById,
  GetPasswordByEmail,
} = require("../models/users.model");
const { v4: uuidv4 } = require("uuid");
const { Success, Bad } = require("../utils/constant");
const bcrypt = require("bcrypt");
const { InvalidPassword, UserNotFound } = require("../utils/message");

module.exports = {
  Register_User_With_EmailAndPassword: async (req, res) => {
    try {
      let hashedPassword = await encrypt(req.body.password);
      const response = await RegisterUser({
        id: uuidv4(),
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
      });
      let encodeData = {
        id: response.rows[0].id,
        name: response.rows[0].name,
      };
      const token = genrateJWT(encodeData);
      res.status(Success).json({ token, status: Success });
    } catch (err) {
      res.status(Bad).json({ message: err.message, status: Bad });
    }
  },
  Register_User_With_Token: async (req, res) => {
    try {
      let hashedPassword = await encrypt(req.body.password);
      const response = await RegisterUser({
        id: req.customData.id,
        name: req.customData.name,
        email: req.customData.email,
        password: hashedPassword,
      });
      let encodeData = {
        id: response.rows[0].id,
        name: response.rows[0].name,
      };
      const token = genrateJWT(encodeData);
      res.status(Success).json({ token, status: Success });
    } catch (err) {
      res.status(Bad).json({ message: err.message, status: Bad });
    }
  },
  Login_With_EmailAndPassword: async (req, res) => {
    try {
      const db_user = await LoginUser({ email: req.body.email });
      const password = req.body.password;
      if (db_user.rows.length > 0) {
        bcrypt.compare(password, db_user.rows[0].password, (err, result) => {
          if (err) {
            console.error("Error comparing passwords:", err);
          } else if (result === true) {
            let encodeData = {
              id: db_user.rows[0].id,
              name: db_user.rows[0].name,
            };
            let token = genrateJWT(encodeData,req.body.rememberMe);
            res.status(Success).json({ token, status: Success });
          } else {
            res.status(Bad).json({ message: InvalidPassword, status: Bad });
          }
        });
      } else {
        res.status(Bad).json({ message: UserNotFound, status: Bad });
      }
    } catch (err) {
      res.status(Bad).json({ message: err.message, status: Bad });
    }
  },
  Login_With_Token: async (req, res) => {
    try {
      const db_user = await LoginUser({ email: req.customData.email });
      if (db_user.rows.length > 0) {
        let encodeData = {
          id: db_user.rows[0].id,
          name: db_user.rows[0].name,
        };
        let token = genrateJWT(encodeData);
        res.status(200).json({ token, status: Success });
      } else {
        res.status(Bad).json({ message: UserNotFound, status: Bad });
      }
    } catch (err) {
      res.status(Bad).json({ message: err.message, status: Bad });
    }
  },
};
