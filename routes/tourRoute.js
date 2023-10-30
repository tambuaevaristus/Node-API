const express = require("express");
const authController = require("./../controller/authController");
const tourController = require("./../controller/tourController");
const router = express.Router();

router
  .route("/")
  .get(
    // authController.protect,
    // authController.restrictTo("admin"),
    tourController.getTours
  )
  .post(tourController.createTour);
router.route("/top").get(tourController.aliasTopTours, tourController.getTours);
router.route("/tours-stats").get(tourController.getTourStats);
router.route("/monthly-plan/:year").get(tourController.getMonthlyPlan);
router
  .route("/:id")
  .get(tourController.getTourById)
  .patch(tourController.updateTour)
  .delete(
    authController.protect,
    authController.restrictTo("admin", "user"),
    tourController.deleteTour
  );

module.exports = router;
