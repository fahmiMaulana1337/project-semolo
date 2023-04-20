const Router = require("express-group-router");
const groupRouter = new Router();
const express = require("express");
const router = express.Router();
const UserController = require("../controllers/userController");
const AdminController = require("../controllers/adminControllers");
const { authentication } = require("../middlewares/auth");
const middleware = require("../middlewares/authRole");
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });

router.post("/register", upload.single("image"), UserController.register);
router.post("/login", UserController.login);

router.use(authentication);
router.post("/asset", UserController.addAsset); // admin
router.get("/assets", UserController.getAsset); // nenggu aset
router.get("/show-request", UserController.getRequestAsset); // admin neggu sapa se request
router.patch("/accept-request/:id", UserController.acceptRequest); // admin acc request
router.get("/payment/:id", UserController.payment);

router.patch("/get-all-wakaf", AdminController.getAllWakafDatas); //admin role
router.get(
  "/get-wakaf-by-id",
  middleware.verifyRole,
  AdminController.getWakafById
); //adminrole
router.post("/set-distribution", AdminController.setDistribution); //admin role
router.post("/update-fund", AdminController.updateFund); //admin role

module.exports = router;
