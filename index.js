const admin = require("firebase-admin");
const functions = require("firebase-functions");
const serviceAccount = require("./service_account.json");
const createUser = require("./create-user");
const requestOneTimePassword = require("./request-one-time-password");
const verifyOneTimePassword = require("./verify-one-time-password");
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://mybeetestauth.firebaseio.com"
});

exports.createUser = functions.https.onRequest(createUser);
exports.requestOneTimePassword = functions.https.onRequest(
  requestOneTimePassword
);
exports.verifyOneTimePassword = functions.https.onRequest(
  verifyOneTimePassword
);

// exports.helloWorld = functions.https.onRequest((request, response) => {
//   response.send("Hello from Firebase!");
// });
// exports.testingGoogleFunction = functions.https.onRequest(
//   (request, response) => {
//     response.send("MyBee!");
//   }
// );
