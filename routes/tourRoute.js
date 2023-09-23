const express = require("express");

const tourController = require("./../controller/tourController");
const router = express.Router();

router.route("/").get(tourController.getTours).post(tourController.createTour);
router.route("/top").get(tourController.aliasTopTours, tourController.getTours);
router.route("/tours-stats").get(tourController.getTourStats);
router
  .route("/:id")
  .get(tourController.getTourById)
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour);

module.exports = router;
