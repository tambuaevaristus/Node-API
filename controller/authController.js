const { promisify } = require("util");
const jwt = require("jsonwebtoken");
const User = require("./../model/userModel");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");

const signToken = (id) => {
  jwt.sign({ id: id }, "this is a long key that is really long", {
    expiresIn: "10d",
  });
};

exports.signup = async (req, res, next) => {
  try {
    const newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      passwordConfirm: req.body.passwordConfirm,
    });

    // const token = signToken(newUser.name);
    const token = jwt.sign(
      { id: user._id},
      "THis is the token key",
      {
        expiresIn: "2h",
      }
    );

    res.status(201).json({
      status: "success>",
      token: "Yessoo" + token,
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

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      next(new AppError("Please provide email and password"));
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user || !(await user.correctPassword(password, user.password))) {
      return next(new AppError("Incorect Email or password", 401));
    }
    // const token = signToken(user);
    const token = jwt.sign(
      { id: user._id},
      "THis is the token key",
      {
        expiresIn: "2h",
      }
    );
    res.status(201).json({
      status: "success",
      user,
      token,
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.protect = catchAsync(async (req, res, next) => {
  let token;
  // Get token and check if it exists
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  console.log(token);

  if (!token) {
    return next(
      new AppError("You are not logged in Please log in again to continue", 401)
    );
  }

  // Verify Token
  const decoded = await promisify(jwt.verify)(token, "THis is the token key");
  console.log(decoded);
  next();
});
