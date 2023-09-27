const User = require("./../model/userModel");
const catchAsync = require("./../utils/catchAsync");

exports.getAllUsers = async (req, res, next) => {
  try {
    const user = await User.find();
    res.status(201).json({
      status: "success",
      data: {
        user,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "success",
      message: err.message,
    });
  }
};

exports.getUser = catchAsync(async (req, res, next) => {});

exports.updateUser = catchAsync(async (req, res, next) => {});

exports.deleteUser = catchAsync(async (req, res, next) => {});

