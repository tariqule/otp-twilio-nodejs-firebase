const twilio = require("twilio");

const accountSid = "ACb4529575c64c323245a4eabf980429d4";
const authToken = "e37b744fb399989527689135ba1c4125";

module.exports = new twilio.Twilio(accountSid, authToken);
