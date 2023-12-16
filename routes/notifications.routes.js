const express = require("express");
const authentication = require("../helpers/JWT/authentication");
const { Create_Notifications, Get_Notifications } = require("../controllers/notifications.controller");
const { Notifications_Validations } = require("../helpers/body_validations/notifications/validator");
const router = express.Router();

// router.post("/create", authentication, Notifications_Validations.CreateBody, Create_Notifications);
router.get("/get", authentication, Get_Notifications);

module.exports = router;
