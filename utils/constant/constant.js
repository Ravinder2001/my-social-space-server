const Config = require("../../configuration/config.js");

module.exports = {
  USER_TYPES: {
    STAFF: "Staff",
    SUPERADMIN: "SuperAdmin",
    GUEST: "Guest",
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
  VARIABLES: {
    GUEST_TICKET_TYPE: 16,
    NEW_TICKET_STATUS: 1,
    QUEUE_TICKET_STATUS: 3,
    HOTEL_APP_NAME: "HotelApp",
  },
  TASK_CATEGORY: {
    AMENITIES: "Amenities",
    SERVICE: "Service",
    MAINTENANCE: "Maintenance",
  },
  SOCKET_EVENTS: {
    GUEST_CHAT_REQ: "guest-chat-request",
    NO_STAFF_AVAILABLE: "no-staff-available",
    TICKET_REQ: "ticket-request",
    ERROR: "error",
    STAFF_CHAT_SEND_MESSAGE: "staff-chat-send-message",
    STAFF_CHAT_RECEIVE_MESSAGE: "staff-chat-receive-message",
    GUEST_CHAT_SEND_MESSAGE: "guest-chat-send-message",
    GUEST_CHAT_RECEIVE_MESSAGE: "guest-chat-receive-message",
    GUEST_CHAT_ACCEPTED: "guest-chat-accepted",
    CLOSE_CONV: "close-conversation",
    CALL_USER: "call-user",
    ANSWER_CALL: "answer-call",
    CALL_ACCEPTED: "call-accepted",
    CALL_REJECTED: "call-rejected",
  },
  TIMEOUT: {
    GUEST_WAITING_TIME: 1 * 60 * 1000,
  },
  PROFILES_TYPE: {
    GUEST: "GUEST",
    COMPANY: "COMPANY",
    AGENT: "AGENT",
    VENDOR: "VENDOR",
  },
  EXCEL_PASSWORD: "123456",
  EXCEL_ROWS_COUNT: 20,
  ASSET_MODULES: {
    ASSET: "ASSET",
    INSURANCE: "INSURANCE",
    SERVICE: "SERVICE",
    WARRANTY: "WARRANTY",
  },
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
};
