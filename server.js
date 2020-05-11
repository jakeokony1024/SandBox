const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes");
const app = express();
const PORT = process.env.PORT || 3001;
require('dotenv').config()
const db = require("./config/keys").mongoURI;
const passport = require("passport");
const users = require("./routes/api/users");

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
	app.use(express.static("client/build"));
}

// Add routes, both API and view
// app.use(routes);
// Passport middleware
app.use(passport.initialize());
// Passport config
require("./config/passport")(passport);
// Routes
app.use("/api/users", users);

// Connect to the Mongo DB
// mongoose.connect(
// 	process.env.MONGODB_URI || "mongodb+srv://jakeokony:tomsucks12@sandbox-iqqya.mongodb.net/test?retryWrites=true&w=majority",
// 	{ useNewUrlParser: true }
// );

mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => console.log("MongoDB successfully connected"))
  .catch(err => console.log(err));

// Start the API server
app.listen(PORT, function () {
	console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});