const express = require("express");
const authController = require("./../controller/authController");
const userController = require("./../controller/userController");
const router = express.Router();

router.post("/signup", authController.signup);

// router
//   .route("/")
//   .get(userController.getAllusers)
// //   .post(userController.createUser);

// router
//   .route("/:id")
//   .get(userController.getUser)
//   .patch(userController.updateUser)
//   .delete(userController.deleteUser);

module.exports = router;
