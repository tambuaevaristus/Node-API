const jwt = require("jsonwebtoken");
const User = require("./../model/userModel");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");

exports.signup = async (req, res, next) => {
  try {
    const newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      passwordConfirm: req.body.passwordConfirm,
    });

    const token = jwt.sign({ id: newUser._id }, "secret-key", {
      expiresIn: "90d",
    });

    res.status(201).json({
      status: "success",
      token,
      data: {
        user: newUser,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.login = function (req, res, next) {
  const { email, password } = req.body;

  if (!email || !password) {
    next(new AppError("Please provide email and password"));
  } else {
    const token = "";
    res.status(201).json({
      status: "success",
      email: email,
      token,
    });
  }
};
