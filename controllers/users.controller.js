const genrateJWT = require("../helpers/JWT/genrateJWT");
const { encrypt } = require("../helpers/password_hashed/password_hashed");
const {
  LoginUser,
  RegisterUser,
  AddProfilePicture,
  GetProfilePicture,
  FindUserById,
} = require("../models/users.model");
const { v4: uuidv4 } = require("uuid");
const { Success, Bad } = require("../utils/constant");
const bcrypt = require("bcrypt");
const { InvalidPassword, UserNotFound } = require("../utils/message");
const { bucket_name } = require("../utils/config");
const { PutObjectCommand } = require("@aws-sdk/client-s3");
const { s3, Image_Link } = require("../s3_bucket.config");

module.exports = {
  ServerHealth: (req, res) => {
    res.status(Success).json({ status: Success });
  },
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
            let token = genrateJWT(encodeData, req.body.rememberMe);
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
  Add_Profile_Picture: async (req, res) => {
    try {
      const user = req.params.user_id;
      const image_name = req.file.originalname.split(".")[1];
      req.file.originalname = user + "." + image_name;
      const Key = `ProfilePictures/${user}/${req.file.originalname}`;
      const Params = {
        Bucket: bucket_name,
        Key,
        Body: req.file.buffer,
        ContentType: req.file.mimetype,
      };
      const command = new PutObjectCommand(Params);
      const image_res = await s3.send(command);
      if (image_res.$metadata.httpStatusCode == Success) {
        await AddProfilePicture({ user_id: user, image: Key });
      }
      return res.status(200).json({
        message: "Profile Picture added successfully",
        status: Success,
      });
    } catch (err) {
      res.status(Bad).json({ message: err.message, status: Bad });
    }
  },
  Get_Profile_Picture: async (req, res) => {
    try {
      const timestamp = await FindUserById({ id: req.params.user_id });

      const image_res = await GetProfilePicture({
        user_id: req.params.user_id,
      });
      if (image_res.rows.length) {
        const image = await Image_Link(image_res.rows[0].image_url);
        return res.status(200).json({
          data: image,
          status: Success,
        });
      }
      if (timestamp.rows.length) {
        const createdAtTimestamp = timestamp.rows[0].created_at;
        const currentTime = new Date();

        // Calculate the difference in milliseconds between the current time and the created_at timestamp
        const timeDifference = currentTime - createdAtTimestamp;

        // Calculate the number of milliseconds in one day
        const oneDayInMilliseconds = 24 * 60 * 60 * 1000;

        // Check if the time difference is greater than one day
        if (timeDifference > oneDayInMilliseconds) {
          return res.status(200).json({
            data: [],
            closeable: false,
            status: 200,
          });
        } else {
          return res.status(200).json({
            data: [],
            closeable: true,
            status: 200,
          });
        }
      }
    } catch (err) {
      res.status(Bad).json({ message: err.message, status: Bad });
    }
  },
};
