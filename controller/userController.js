const User = require("./../model/userModel");
const catchAsync = require("./../utils/catchAsync");
const accountSid = "AC48c29140d5b5a566e674061a78ab8d54";
const authToken = "c194664c113cb9365bf75784ad7ba0dd";

const client = require("twilio")(accountSid, authToken);

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

exports.getUser = catchAsync(async (req, res, next) => {
  await client.messages
    .create({
      body: "Your appointment is coming up on July 21 at 3PM  Eva new message",
      from: "whatsapp:+14155238886",
      to: "whatsapp:+23776814364",
    })
    .then((message) => console.log(message.sid));
});

exports.updateUser = catchAsync(async (req, res, next) => {});

exports.deleteUser = catchAsync(async (req, res, next) => {});

// Test Whatsapp messaging
exports.sendMessage = async () => {
  console.log("Sending message");
  await client.messages
    .create({
      body: "Your appointment is coming up on July 21 at 3PM  Eva new message",
      from: "whatsapp:+14155238886",
      to: "whatsapp:+23776814364",
    })
    .then((message) => console.log(message.sid));
};
