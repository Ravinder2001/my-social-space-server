const express = require("express");
const commanController = require("../controller/upload.controller");
const { authenticateJWT } = require("../auth/index");
const handleFileUpload = require("../middleware/fileUpload");

const router = express.Router();

// Route to handle file upload for staff
router.post("/", authenticateJWT, handleFileUpload, commanController.fileUpload);

module.exports = router;
