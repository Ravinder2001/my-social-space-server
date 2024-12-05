const express = require("express");
const validateBody = require("../helpers/validateBodyHelper");
const schemas = require("../validations/users/payloadValidation");
const UserController = require("../controller/users.controller");
const guestDbValidate = require("../helpers/userDbValidate");

const router = express.Router();

router.post("/register", validateBody(schemas.registerUser), UserController.register);
router.post("/login", validateBody(schemas.loginUser), guestDbValidate.validateLogin, UserController.login);

module.exports = router;
