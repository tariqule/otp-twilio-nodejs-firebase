const admin = require("firebase-admin");
const twilio = require("./twilio");

module.exports = function(req, res) {
  if (!req.body.phone) {
    return res.status(422).send({ error: "You must enter a phone number" });
  }

  const phone = String(req.body.phone).replace(/[^\d]/g, "");
  admin
    .auth()
    .getUser(phone)
    .then(userRecord => {
      const code = Math.floor(Math.random() * 899999 + 100000); //we need to save after its been sent

      //Theres 3 props in this object are//body
      //To
      //from : the number generated using twilio
      //Twilio does not support promis so we will use call back functions
      twilio.messages.create(
        {
          body: `Your MyBee verification code is ${code}.`,
          to: phone,
          from: "+16476976704"
        },
        err => {
          if (err) {
            return res.status(422).send(err);
            // in prod env we need to write something went wrong
          }
        },
        //added a new user where we will s
        admin
          .database()
          .ref("users/" + phone)
          .update({ code: code, codeValid: true }, () => {
            res.send({ success: true });
          })
      );
    })
    .catch(err => {
      console.log(err);
      //res.status(422).send({error: "User not found"})
      //for prod env
    });
};
