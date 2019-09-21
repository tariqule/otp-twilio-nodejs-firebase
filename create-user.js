const admin = require("firebase-admin");

module.exports = function(req, res) {
  //   res.send(req.body);
  if (!req.body.phone) {
    return res.status(422).send({ error: "Bad Input" });
  }
  //format the number
  const phone = String(req.body.phone).replace(/[^\d]/g, "");
  const key = null;
  admin
    .auth()
    .createUser({ uid: phone, key })
    .then(user => res.send(user))
    .catch(err => res.status(422).send({ error: err }));
};
//verify the user provided a phone number

//if the phone number is provided then remove dash and parens

//create a new user using the phone number
