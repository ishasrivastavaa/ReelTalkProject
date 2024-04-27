const express = require("express");
const bodyParser = require("body-parser");

const app = express();

// Routes
const authRoutes = require("./routes/auth");
const movieRoutes = require("./routes/movie");
const likesRoutes = require("./routes/likes");

// Middlewares
app.use(bodyParser.json());

// Routes
app.use("/user", authRoutes);
app.use("/movies", movieRoutes);
app.use("/likes", likesRoutes);

// PORT
const port = 3000;

// Starting a server
app.listen(port, () => {
  console.log(`app is running at ${port}`);
});