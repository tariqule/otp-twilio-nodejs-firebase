const admin = require("firebase-admin");

module.exports = function(req, res) {
  if (!req.body.phone || !req.body.code) {
    return res.status(422).send({ error: "Phone and code must be provided" });
  }

  const phone = String(req.body.phone).replace(/[^\d]/g, "");
  const code = parseInt(req.body.code);
  const randomKey = String(Math.floor(Math.random() * 89999999 + 10000000));

  admin
    .auth()
    .getUser(phone)
    .then(() => {
      const ref = admin.database().ref("users/" + phone);
      ref.on("value", snapshot => {
        ref.off();
        const user = snapshot.val();

        if (user.code !== code || !user.codeValid) {
          return res.status(422).send({ error: "Code not valid" });
        }

        ref.update({ codeValid: false });
        res.send({ key: randomKey });

        ref.update({ key: randomKey });
      });
    })
    .catch(err => res.status(422).send({ error: err }));
};
