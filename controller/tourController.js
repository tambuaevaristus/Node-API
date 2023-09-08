const Tour = require("./../model/tourModel");

exports.createTour = async (req, res) => {
  const newTour = await Tour.create(req.body);

  res
    .status(201)
    .json({
      status: "success",
      data: {
        tour: newTour,
      },
    })
    .catch((err) => {
      res.status(400).json({
        status: "fail",
        message: err.message,
      });
    });
};

exports.getTours = async (req, res) => {
  const tours = await Tour.find();
  res
    .status(200)
    .json({
      status: "success",
      data: {
        tours,
      },
    })
    .catch((err) => {
      res.status(400).json({
        status: "fail",
        message: err.message,
      });
    });
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
      status: "success"
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};
