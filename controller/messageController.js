const catchAsync = require("../utils/catchAsync");
const accountSid = "AC4671bc8712de16eca6659f6e3b85bbb8";
const authToken = "d675f2fd87eee1965fd965ced472a4a6";

const client = require("twilio")(accountSid, authToken);

exports.sendMessage = catchAsync(async (req, res, next) => {
  const message = req.body.body;
  const phoneNumber = req.body.to;

  send(phoneNumber, message);

  const response = await client.validationRequests.create({
    friendlyName: "WhatsApp Number Validation",
    phoneNumber: `${phoneNumber}`,
  });

  if (response.valid) {
    res.status(200).json({
      status: "success",
      data: {
        response,
      },
    });
  } else {
    // return `Phone number ${phoneNumber} does not exist on WhatsApp.`;
    res.status(400).json({
      status: "failed",
      data: {
        response,
      },
    });
  }
});

// async function checkWhatsAppNumber(phoneNumber) {
//   try {
//   } catch (error) {
//     console.error("Error checking WhatsApp number:", error);
//   }
// }

async function send(phone, body) {
  const messageResponse = await client.messages
    .create({
      body: body,
      from: "whatsapp:+14154668513",
      to: "whatsapp:" + phone,
    })
    .then((response) => {
      res.status(200).json({
        status: "success",
        data: {
          response,
        },
      });
    })
    .catch((error) => {
      res.status(500).json({
        status: "failed",
        data: {
          error,
        },
      });
    });
}
