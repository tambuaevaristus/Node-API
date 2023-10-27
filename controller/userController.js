const User = require("./../model/userModel");
const catchAsync = require("./../utils/catchAsync");
const accountSid = 'AC5a5709f27c34c2617f9b826737d58aeb';
const authToken = '4cd12cb9139f04ddf49811477953197a';

const client = require('twilio')(accountSid, authToken);

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



// Test Whatsapp messaging
exports.sendMessage = catchAsync(async (req, res, next) => {

  console.log('Sending message')
await client.messages
    .create({
        body: 'Your appointment is coming up on July 21 at 3PM',
        from: 'whatsapp:+14155238886',
        to: 'whatsapp:+23776814364'
    })
    .then(message => console.log(message.sid))
    .done();
});

