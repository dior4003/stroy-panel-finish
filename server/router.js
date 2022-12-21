const express = require("express");
const router = express.Router();
const userController = require("./usercontrol");

// Routes
router.get("/", userController.view);
router.get("/uz", userController.viewuz);
router.get("/product", userController.product);
router.get("/login", userController.admin);
router.get("/delete-img/:id", userController.productId);
router.get("/product/:id", userController.deleteImg);

router.get("/contact-delete/:id", userController.deleteCont);
router.get("/img/", userController.imgone);
router.get("/thanks", userController.thanks);

router.get("/all", userController.allFiles);
router.get("/slider", userController.slider);
router.get("/admin-setting", userController.setting);
router.get("/update-insta", userController.updInsta);

router.get("/logout", userController.logout);
router.get("/upload", userController.uploadGet);
router.get("/dashboard", userController.dashboard);
router.post("/login", userController.login);
router.post("/add-banner", userController.sliderform);
router.get("/add-slider", userController.addbanner);
router.post("/login-upd", userController.updpass);
router.post("/user-contact", userController.userContact);
router.get("*", userController.notFound);

module.exports = router;
