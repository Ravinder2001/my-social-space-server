const Config = require("../../configuration/config.js");

module.exports = {
  USER_TYPES: {
    USER: "User",
  },
  TIME_FORMAT: {
    STANDARD_TIME_FORMAT: "YYYY-MM-DD HH:mm:ss",
  },
  HttpStatus: {
    OK: 200,
    CREATED: 201,
    ACCEPTED: 202,
    NO_CONTENT: 300,
    MOVED_PERMANENTLY: 301,
    FOUND: 302,
    NOT_MODIFIED: 304,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    ALREADY_EXISTS: 403,
    NOT_FOUND: 404,
    NOT_ALLOWED: 405,
    CONFLICT: 409,
    INTERNAL_SERVER_ERROR: 500,
  },
  TIME: {
    expiry_time: 10, //Minutes
  },
  TRANSPORT_CONFIG: {
    local: Config.transportConfig,
    dev: Config.transportConfigSmtp,
    qa: Config.transportConfigSmtp,
    production: Config.transportConfigSmtp,
  },

  SOCKET_EVENTS: {},
  FILE_LIMITS: {
    general: 100 * 1024 * 1024, // 100 MB
    image: { min: 5 * 1024, max: 5 * 1024 * 1024 }, // 5 KB - 5 MB
    video: { min: 10 * 1024, max: 100 * 1024 * 1024 }, // 10 KB - 100 MB
    audio: { min: 10 * 1024, max: 20 * 1024 * 1024 }, // 10 KB - 20 MB
    document: { min: 10 * 1024, max: 100 * 1024 * 1024 }, // 10 KB - 100 MB
  },
  ALLOWED_MIME_TYPES: {
    image: ["image/jpeg", "image/png", "image/gif"],
    video: ["video/mp4", "video/mkv", "video/avi"],
    audio: ["audio/mpeg", "audio/mp3", "audio/wav"],
    document: [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "application/vnd.ms-excel",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "text/csv",
      "application/octet-stream",
    ],
  },
  VARIABLES:{
    REGEX:"^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])"
  }
};
