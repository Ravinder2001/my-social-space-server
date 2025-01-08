const express = require("express");
const multer = require("multer");

const commanController = require("../controller/upload.controller");
const { authenticateJWT } = require("../auth/index");
const { FILE_LIMITS, ALLOWED_MIME_TYPES } = require("../utils/constant/constant");

const router = express.Router();

// Initialize multer with memory storage and file size limit
const memoryStorage = multer.memoryStorage();
const upload = multer({
  storage: memoryStorage,
  limits: { fileSize: FILE_LIMITS.general },
  fileFilter: (req, file, cb) => {
    const fileType = file.mimetype;
    const fileSize = parseInt(req.headers["content-length"]);

    // Helper function to validate file type and size
    const validateFile = (types, limits) => {
      if (types.includes(fileType)) {
        if (fileSize < limits.min) {
          req.fileValidationError = {
            status: 400,
            message: `File size is too small. Minimum allowed size for this file type is ${limits.min / 1024} KB.`,
          };
          return cb(null, false);
        } else if (fileSize > limits.max) {
          req.fileValidationError = {
            status: 400,
            message: `File size exceeds the limit. Maximum allowed size for this file type is ${limits.max / 1024 / 1024} MB.`,
          };
          return cb(null, false);
        }
        return true;
      }
      return false;
    };

    // Validate file type and size for each category
    if (
      validateFile(ALLOWED_MIME_TYPES.image, FILE_LIMITS.image) ||
      validateFile(ALLOWED_MIME_TYPES.video, FILE_LIMITS.video) ||
      validateFile(ALLOWED_MIME_TYPES.audio, FILE_LIMITS.audio) ||
      validateFile(ALLOWED_MIME_TYPES.document, FILE_LIMITS.document)
    ) {
      cb(null, true); // File is valid
    } else {
      req.fileValidationError = {
        status: 400,
        message: "Invalid file type. Only images, videos, audio files, and documents are allowed.",
      };
      cb(null, false); // Reject file
    }
  },
}).any();

// Middleware for handling file upload and errors
const handleFileUpload = (req, res, next) => {
  upload(req, res, (err) => {
    if (req.fileValidationError) {
      return res.status(req.fileValidationError.status).json({
        success: 0,
        message: req.fileValidationError.message,
      });
    }
    if (err instanceof multer.MulterError) {
      return res.status(400).json({
        success: 0,
        message: err.code === "LIMIT_FILE_SIZE" ? "File size exceeds the limit." : "File upload failed due to size or type restrictions.",
      });
    }
    if (err) {
      return res.status(500).json({
        success: 0,
        message: "File upload failed. Please try again.",
      });
    }
    next();
  });
};

// Route to handle file upload for staff
router.post("/", authenticateJWT, handleFileUpload, commanController.fileUpload);

module.exports = router;
