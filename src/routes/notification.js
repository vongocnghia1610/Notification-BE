const express = require("express");
const router = express.Router();


const notificationController = require("../app/Controllers/NotificationController");
router.post("/notify", notificationController.notify);
module.exports = router;
