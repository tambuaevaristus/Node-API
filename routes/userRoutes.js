const express = require("express");
const authController = require("./../controller/authController");
const userController = require("./../controller/userController");
const router = express.Router();

router.post("/signup", authController.signup);
router.post("/login", authController.login);

router.post("/forgotPassword", authController.forgotPassword);
router.post("/resetPassword", authController.resetPassword);

router.post("/send", userController.sendMessage);
router.route("/").get(userController.getAllUsers);
//   .post(userController.createUser);

router
  .route("/:id")
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
