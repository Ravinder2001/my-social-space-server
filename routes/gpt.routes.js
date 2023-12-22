const express = require("express");
const { Post_Caption_Generator } = require("../controllers/gpt.controller");
const authentication = require("../helpers/JWT/authentication");
const router = express.Router();

router.post("/generate_caption", authentication, Post_Caption_Generator);

module.exports = router;
