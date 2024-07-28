const express = require("express");
const validateBody = require("../helpers/validateBody");
const schema = require("../validations/userValidation");
const { register } = require("../controllers/users.controller");
const { validateUserEmail } = require("../middleware/usersValidation");

const router = express.Router();

router.post("/register", validateBody(schema.registerPayloadValidation), validateUserEmail, register);

module.exports = router;
