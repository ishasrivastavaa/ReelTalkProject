const {admin} = require("./../config/firebase");

exports.isAuthenticated = (req, res, next) => {
    const authToken = req.headers.authorization;
  
    if (!authToken) {
      return res.status(401).json({ error: "Unauthorized, authentication token missing" });
    }
  
    admin
      .auth()
      .verifyIdToken(authToken)
      .then((decodedToken) => {
        req.authUser = decodedToken.uid;
        next();
      })
      .catch((error) => {
        return res.status(401).json({ error: "Unauthorized, invalid authentication token" });
      });
  };