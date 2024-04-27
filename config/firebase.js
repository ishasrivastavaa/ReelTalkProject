const firebase = require("firebase/compat/app");
require("firebase/compat/auth");
require("firebase/compat/firestore");
var admin = require("firebase-admin");
var serviceAccount = require("../firebase-admin.json")

const firebaseConfig = require("../firebase.json")

firebase.initializeApp(firebaseConfig);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

module.exports = {firebase, admin};
