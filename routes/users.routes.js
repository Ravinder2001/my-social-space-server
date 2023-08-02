const express = require("express");
const {
  Register_User_With_EmailAndPassword,
  Register_User_With_Token,
  Login_With_EmailAndPassword,
  Login_With_Token,
} = require("../controllers/users.controller");
const { Verify_Id_Token } = require("../middlewares/middlewares");
const {
  UserValidations,
} = require("../helpers/db_validations/users.validations");
const { User_Validations } = require("../helpers/body_validations/authentication/validator");
const router = express.Router();

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
module.exports = router;
