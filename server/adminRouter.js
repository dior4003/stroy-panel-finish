const express = require("express");
const router = express.Router();
const userController = require("./usercontrol");

// Routes
router.get("/upload", userController.uploadGet);

module.exports = router;
