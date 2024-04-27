const { firebase } = require("./../config/firebase");

// signup
exports.signup = (req, res) => {
  if (!req.body.email || !req.body.password) {
    return res.status(400).json({
      email: "email is required",
      password: "password is required",
    });
  }
  firebase
    .auth()
    .createUserWithEmailAndPassword(req.body.email, req.body.password)
    .then((data) => {
      console.log("Signup complete", data.user.email);
      return res.status(200).json({ 
        message: "Signup was successful!",
        access_token: data.user.accessToken
    });
    })
    .catch(function (error) {
      let errorMessage = error.message;
      return res.status(500).json({ error: errorMessage });
    });
};

// signin
exports.signin = (req, res) => {
  if (!req.body.email || !req.body.password) {
    return res.status(400).json({
      email: "email is required",
      password: "password is required",
    });
  }
  firebase
    .auth()
    .signInWithEmailAndPassword(req.body.email, req.body.password)
    .then((user) => {
      console.log("Signin complete", user.user.email)
      const accessToken = user.user._delegate.stsTokenManager.accessToken;
      return res.status(200).json({ 
        message: "Signin was successful!",
        access_token: accessToken
    });
    })
    .catch(function (error) {
      let errorMessage = error.message;

      return res.status(500).json({ error: errorMessage });
    });
};

// update password
exports.updatePassword = (req, res) => {
  if (!req.body.email || !req.body.oldPassword || !req.body.newPassword) {
    return res.status(422).json({
      email: "email is required",
      oldPassword: "old password is required",
      newPassword: "new password is required",
    });
  }

  firebase
    .auth()
    .signInWithEmailAndPassword(req.body.email, req.body.oldPassword)
    .then((userCredential) => {
      const user = userCredential.user;
      user
        .updatePassword(req.body.newPassword)
        .then(() => {
          return res
            .status(200)
            .json({ message: "Password updated successfully" });
        })
        .catch((error) => {
          return res.status(500).json({ error: error.message });
        });
    })
    .catch((error) => {
      return res.status(500).json({ error: error.message });
    });
};
