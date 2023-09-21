const genrateJWT = require("../helpers/JWT/genrateJWT");
const { encrypt } = require("../helpers/password_hashed/password_hashed");
const {
  LoginUser,
  RegisterUser,
  AddProfilePicture,
  GetProfilePicture,
  FindUserById,
  DeleteProfilePicture,
  UpdateProfileData,
  GetAllUsers,
  GetProfileData,
  GetAnotherUserProfileData,
  GetUserInfo,
  AddUserOnlineStatus,
  UpdateUserOnlineStatus,
  GetUserOnlineStatus,
} = require("../models/users.model");
const { v4: uuidv4 } = require("uuid");
const { Success, Bad } = require("../utils/constant");
const bcrypt = require("bcrypt");
const { InvalidPassword, UserNotFound, Something } = require("../utils/message");
const { bucket_name } = require("../utils/config");
const { PutObjectCommand, DeleteObjectCommand } = require("@aws-sdk/client-s3");
const { s3, Image_Link } = require("../s3_bucket.config");
const { GetFriendRequestBySenderAndReceiver } = require("../models/friends.modal");

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
      await AddUserOnlineStatus({ user_id: response.rows[0].id });
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
      await AddUserOnlineStatus({ user_id: response.rows[0].id });
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
        res.status(Success).json({ token, status: Success });
      } else {
        res.status(Bad).json({ message: UserNotFound, status: Bad });
      }
    } catch (err) {
      res.status(Bad).json({ message: err.message, status: Bad });
    }
  },
  Add_Profile_Picture: async (req, res) => {
    try {
      const user = req.customData;
      const profileDataRes = await UpdateProfileData({
        id: user,
        job: req.body.job,
        location: req.body.location,
      });
      if (profileDataRes.rowCount > 0) {
        req.file.originalname = user + ".jpeg";
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
        const profile_picture = await Image_Link(Key);
        return res.status(Success).json({
          data: profile_picture,
          status: Success,
        });
      }
    } catch (err) {
      res.status(Bad).json({ message: err.message, status: Bad });
    }
  },
  Get_Profile_Picture: async (req, res) => {
    try {
      const timestamp = await FindUserById({ id: req.customData });

      const image_res = await GetProfilePicture({
        user_id: req.customData,
      });
      if (image_res.rows.length) {
        const image = await Image_Link(image_res.rows[0].image_url);
        return res.status(Success).json({
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
          return res.status(Success).json({
            data: null,
            closeable: false,
            status: Success,
          });
        } else {
          return res.status(Success).json({
            data: null,
            closeable: true,
            status: Success,
          });
        }
      }
    } catch (err) {
      res.status(Bad).json({ message: err.message, status: Bad });
    }
  },
  Update_Profile_Data: async (req, res) => {
    try {
      const user = req.customData;
      const profileDataRes = await UpdateProfileData({
        id: user,
        job: req.body.job,
        location: req.body.location,
      });

      if (req.body.delete) {
        const image_res = await GetProfilePicture({
          user_id: req.customData,
        });
        if (image_res.rows.length) {
          const params = {
            Bucket: bucket_name,
            Key: image_res.rows[0].image_url,
          };
          const command = new DeleteObjectCommand(params);
          await s3.send(command);
          await DeleteProfilePicture({ user_id: req.customData });
          return res.status(Success).json({
            message: "Profile Data Updated",
            status: Success,
          });
        }
        return res.status(Success).json({
          message: "Profile Data Updated",
          status: Success,
        });
      }
      return res.status(Success).json({ message: "Profile Data Updated", status: Success });
    } catch (err) {
      res.status(Bad).json({ message: err.message, status: Bad });
    }
  },
  Get_All_Users: async (req, res) => {
    try {
      const response = await GetAllUsers({ name: req.params.name });
      await Promise.all(
        response.rows.map(async (item) => {
          let link = await Image_Link(item.image_url);
          item.image_url = link;
        })
      );
      return res.status(Success).json({
        data: response.rows,
        status: Success,
      });
    } catch (err) {
      res.status(Bad).json({ message: err.message, status: Bad });
    }
  },
  Get_Profile_Data: async (req, res) => {
    try {
      const response = await GetProfileData({ id: req.customData });
      if (response.rows.length) {
        const url = await Image_Link(response.rows[0].profile_picture);
        response.rows[0].profile_picture = url;
        return res.status(Success).json({
          data: response.rows[0],
          status: Success,
        });
      }
      return res.status(Success).json({
        data: null,
        status: Success,
      });
    } catch (err) {
      res.status(Bad).json({ message: err.message, status: Bad });
    }
  },
  Get_Another_User_Profile_Data: async (req, res) => {
    try {
      const response = await GetAnotherUserProfileData({
        secondary_user: req.params.user_id,
        main_user: req.customData,
      });
      if (response.rows.length) {
        let data = response.rows[0];
        const url = await Image_Link(data.profile_picture);
        data.profile_picture = url;
        if (data.friend_request_received == 1) {
          let friendRequestResponse = await GetFriendRequestBySenderAndReceiver({
            receiver_id: req.customData,
            sender_id: req.params.user_id,
          });
          data.friend_Request_Id = friendRequestResponse.rows[0].id;
        }
        if (data.friend_request_sent == 1) {
          let friendRequestResponse = await GetFriendRequestBySenderAndReceiver({
            sender_id: req.customData,
            receiver_id: req.params.user_id,
          });
          data.friend_Request_Id = friendRequestResponse.rows[0].id;
        }

        return res.status(Success).json({
          data: data,
          status: Success,
        });
      }

      return res.status(Success).json({
        data: null,
        status: Success,
      });
    } catch (err) {
      res.status(Bad).json({ message: err.message, status: Bad });
    }
  },
  Get_User_Info: async (req, res) => {
    try {
      const response = await GetUserInfo({ user_id: req.customData });
      if (response.rows.length) {
        response.rows[0].username = response.rows[0].name.split(" ")[0];
        return res.status(Success).json({
          data: response.rows[0],
          status: Success,
        });
      }
      return res.status(Bad).json({
        data: null,
        status: Bad,
      });
    } catch (err) {
      res.status(Bad).json({ message: err.message, status: Bad });
    }
  },
  Update_User_Online_Status: async (req, res) => {
    try {
      await UpdateUserOnlineStatus({
        user_id: req.customData,
        status: req.params.status,
        room_id: req.body.room_id,
      });

      return res.status(Success).json({
        status: Success,
      });
    } catch (err) {
      res.status(Bad).json({ message: err.message, status: Bad });
    }
  },
  Get_User_Online_Status: async (req, res) => {
    try {
      const response = await GetUserOnlineStatus({
        user_id: req.params.user_id,
      });

      return res.status(Success).json({
        data: response.rows[0],
        status: Success,
      });
    } catch (err) {
      res.status(Bad).json({ message: err.message, status: Bad });
    }
  },
};
