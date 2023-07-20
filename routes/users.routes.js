const express = require("express");
const {
  Register_User_With_EmailAndPassword,
  Register_User_With_Token,
  Login_With_EmailAndPassword,
  Login_With_Token,
} = require("../controllers/users.controller");
const { Verify_Id_Token } = require("../middlewares/middlewares");
const authentication = require("../helpers/JWT/authentication");
const router = express.Router();

router.post(
  "/registerWithEmailAndPassword",
  Register_User_With_EmailAndPassword
);
router.post("/registerWithToken", Verify_Id_Token, Register_User_With_Token);

router.post("/loginWithEmailAndPassword", Login_With_EmailAndPassword);
router.post("/loginWithToken", Verify_Id_Token, Login_With_Token);
module.exports = router;
