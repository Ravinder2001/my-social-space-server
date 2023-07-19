const express = require("express");
const { Login_User_Controller, Register_User_Controller } = require("../controllers/users.controller");
const router = express.Router();

router.post("/register", Register_User_Controller);
router.get("/", Login_User_Controller);
module.exports = router;
