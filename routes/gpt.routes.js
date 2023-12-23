const express = require("express");
const { Generator_Caption, Generator_Suggestion } = require("../controllers/gpt.controller");
const authentication = require("../helpers/JWT/authentication");
const router = express.Router();

router.post("/generate_caption", authentication, Generator_Caption);
router.post("/generate_suggestion", authentication, Generator_Suggestion);

module.exports = router;
