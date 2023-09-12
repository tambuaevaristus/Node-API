const Tour = require("./../model/tourModel");

exports.aliasTopTours = (req,res,next) => {
  req.query.limit = '5';
  req.query.sort = 'price';
  req.query.fields = 'name,price,ratingsAverage,summary,difficulty';
  next();
}

exports.createTour = async (req, res) => {
  try {
    const newTour = await Tour.create(req.body);
    res.status(201).json({
      status: "success",
      data: {
        tour: newTour,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.getTours = async (req, res) => {
  try {
    const queryObj = { ...req.query };

    // Filtering

    const excludedFields = ["page", "sort", "limit", "fields"];
    excludedFields.forEach((field) => delete queryObj[field]);

    let queryStr = JSON.stringify(queryObj);

    // queryStr = queryStr.replace(/\b(gte|lte|lt|gt)\b/g, (match) => `$${match}`);

    console.log(JSON.parse(queryStr));
    let query = Tour.find(JSON.parse(queryStr));

    // Sorting
    if (req.query.sort) {
      query = query.sort(req.query.sort);
    }

    // Fields limitng

    if (req.query.fields) {
      const fields = req.query.fields.split(",").join(" ");
      query = query.select(fields);
    } else {
      query = query.select("-__v");
    }

    // Pagination
    const page = req.query.page * 1;
    const limit = req.query.limit * 1;
    const skip = (page - 1) * limit;

    query = query.skip(skip).limit(limit);

    if (req.query.page){
      const numTours = await Tour.countDocuments();
      if (skip >= numTours) throw new Error("page does not exist");
    }

    const tours = await query;
    res.status(200).json({
      status: "success",
      results: tours.length,
      data: {
        tours,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.getTourById = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);
    res.status(200).json({
      status: "success",
      data: {
        tour,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.updateTour = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json({
      status: "success",
      data: {
        tour,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.deleteTour = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndDelete(req.params.id);
    res.status(200).json({
      status: "success",
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};
