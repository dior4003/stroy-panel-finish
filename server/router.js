const express = require("express");
const router = express.Router();
const userController = require("./usercontrol");

// Routes
router.get("/", userController.view);
router.get("/login", userController.admin);
router.get("/delete-img/:id", userController.deleteImg);
router.get("/img/", userController.imgone);

router.get("/all", userController.allFiles);
router.get("/admin-setting", userController.setting);
router.get("/update-insta", userController.updInsta);

router.get("/logout", userController.logout);
router.get("/upload", userController.uploadGet);
router.get("/dashboard", userController.dashboard);
router.post("/login", userController.login);
router.post("/user-contact", userController.userContact);
router.get("*", userController.notFound);

module.exports = router;
