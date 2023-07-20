const express = require("express");
const {
  Register_User_With_EmailAndPassword,
  Register_User_With_Token,
  Login_With_EmailAndPassword,
  Login_With_Token,
} = require("../controllers/users.controller");
const { Verify_Id_Token } = require("../middlewares/middlewares");
const authentication = require("../helpers/JWT/authentication");
const {
  UserValidations,
} = require("../helpers/db_validations/users.validations");
const router = express.Router();

router.post(
  "/registerWithEmailAndPassword",
  UserValidations,
  Register_User_With_EmailAndPassword
);
router.post("/registerWithToken", Verify_Id_Token,UserValidations, Register_User_With_Token);

router.post("/loginWithEmailAndPassword", Login_With_EmailAndPassword);
router.post("/loginWithToken", Verify_Id_Token, Login_With_Token);
module.exports = router;
