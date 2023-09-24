const mongoose = require("mongoose");

const tourSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Tour must have a name"],
      maxlength: [30, "Tour must have at least 30 characters"],
      minlength: [5, "Tour must have at least 5 characters"],
    },
    slug: String,
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
      enum: {
        values: ["easy, difficult", "medium"],
        message: "Difficulty is either difficult or medium or easy",
      },
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
      select: false,
    },
    startDates: [Date],
    secretTour: {
      type: Boolean,
      default: false,
    },
    imageCover: String,
    images: [String],
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

tourSchema.virtual("durationWeeks").get(function () {
  return this.durations / 7;
});

// runs before .save and .create

// tourSchema.pre('save', function(next){
// this.slug = slugify(this.name, {lower:true});
// next();
// });

// tourSchema.post('save', function(doc, next){
//  console.log(doc);
//  next()
// });

tourSchema.pre("find", function (next) {
  this.find({ secretTour: true });
  next();
});

// Aggregation middleware
tourSchema.pre("aggregate", function (next) {
  this.pipeline().unshift({ $match: { secretTour: { $ne: true } } });
  next();
});
const Tour = mongoose.model("Tour", tourSchema);
module.exports = Tour;
