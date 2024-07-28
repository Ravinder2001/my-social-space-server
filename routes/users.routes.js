const express = require("express");
const validateBody = require("../helpers/validateBody");
const schema = require("../validations/userValidation");
const { register, login } = require("../controllers/users.controller");
const { validateDuplicateEmail, validateEmail, validatePassword } = require("../middleware/usersValidation");

const router = express.Router();

router.post("/register", validateBody(schema.registerPayloadValidation), validateDuplicateEmail, register);
router.post("/login", validateBody(schema.loginPayloadValidation), validateEmail, validatePassword, login);

module.exports = router;
