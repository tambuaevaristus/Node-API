const catchAsync = require("../utils/catchAsync");
const accountSid = "AC48c29140d5b5a566e674061a78ab8d54";
const authToken = "c194664c113cb9365bf75784ad7ba0dd";

const client = require("twilio")(accountSid, authToken);


exports.sendMessage = catchAsync( async(req, res, next)=>{
    await client.messages
    .create({
      body: req.body.message,
      from: "whatsapp:+14155238886",
      to: "whatsapp:+237676814364",
    })
    .then((message) => console.log(message.sid));
})