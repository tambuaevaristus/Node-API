const mongoose = require("mongoose");

const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Tour must have a name"],
  },
  durations: {
    type: Number,
  },
  rating: {
    type: Number,
    default: 4.5,
  },
  maxGroupSize: Number,
  price: {
    type: Number,
    required: [true, "Tour must have a price"],
  },
  difficulty: {
    type: String,
    required: [true, "Tour must have a difficulty"],
  },
  ratingsAverage: {
    type: Number,
    default: 4.5,
  },
  ratingsQuantity: {
    type: Number,
    default: 0,
  },
  description: {
    type: String,
    required: [true, "A tour must have a description"],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  startDates: [Date],
  imageCover: String,
  images: [String],
});

const Tour = mongoose.model("Tour", tourSchema);
module.exports = Tour;
