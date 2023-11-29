const catchAsync = require("../utils/catchAsync");
const accountSid = "AC4671bc8712de16eca6659f6e3b85bbb8";
const authToken = "d675f2fd87eee1965fd965ced472a4a6";

const client = require("twilio")(accountSid, authToken);

exports.sendMessage = catchAsync(async (req, res, next) => {
  const messageResponse = await client.messages.create({
    body: req.body.body,
    from: "whatsapp:+14154668513",
    to: "whatsapp:" + req.body.to,
  });

  res.status(200).json({
    status: "success",
    data: {
      messageResponse,
    },
  });
});
