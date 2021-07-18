const express = require("express");
const router = express.Router();


const notificationController = require("../app/Controllers/NotificationController");
router.get("/notify", notificationController.notify);
module.exports = router;
