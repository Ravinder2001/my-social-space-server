const express = require("express");
const {
  Register_User_With_EmailAndPassword,
  Register_User_With_Token,
  Login_With_EmailAndPassword,
  Login_With_Token,
  Add_Profile_Picture,
  Get_Profile_Picture,
  ServerHealth,
  Delete_Profile_Picture,
  Get_All_Users,
  Get_Profile_Data,
  Update_Profile_Data,
  Get_Another_User_Profile_Data,
  Get_User_Info,
} = require("../controllers/users.controller");
const { Verify_Id_Token } = require("../middlewares/middlewares");
const {
  UserValidations,
} = require("../helpers/db_validations/users.validations");
const {
  User_Validations,
} = require("../helpers/body_validations/authentication/validator");
const router = express.Router();
const multer = require("multer");
const { File_Extension } = require("../utils/constant");
const authentication = require("../helpers/JWT/authentication");
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.get("/health", ServerHealth);

router.post(
  "/registerWithEmailAndPassword",
  User_Validations.RegisterUser,
  UserValidations,
  Register_User_With_EmailAndPassword
);
router.post(
  "/registerWithToken",
  User_Validations.RegisterUserToken,
  Verify_Id_Token,
  UserValidations,
  Register_User_With_Token
);

router.post(
  "/loginWithEmailAndPassword",
  User_Validations.LoginUser,
  Login_With_EmailAndPassword
);
router.post(
  "/loginWithToken",
  User_Validations.LoginUserToken,
  Verify_Id_Token,
  Login_With_Token
);

router.post(
  "/addProfilePicture",
  authentication,
  upload.single(File_Extension),
  User_Validations.ProfilePicture,
  Add_Profile_Picture
);
router.get("/getProfilePicture", authentication, Get_Profile_Picture);
router.post("/updateProfileData", authentication, Update_Profile_Data);
router.get("/getAllUsers/:name", authentication, Get_All_Users);
router.get("/getProfileData", authentication, Get_Profile_Data);
router.get("/getProfileData/:user_id", authentication, Get_Another_User_Profile_Data);
router.get("/getUserInfo", authentication, Get_User_Info);
module.exports = router;
