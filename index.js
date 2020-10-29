// in React we will not use commonJS
//instead import syntax
const express = require("express");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const passport = require("passport");
const keys = require("./config/keys");
//order of require statments super duper important
require("./models/User");
require("./services/passport");

const config = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
};

//connect to MongoDB
mongoose.connect(keys.MongoURI, config);

const app = express();

//tell express that it needs to use cookies for authentification
app.use(
  cookieSession({
    // cookie lasts 30 days
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey],
  })
);

app.use(passport.initialize());
app.use(passport.session());

//my authRoutes are called with express
require("./routes/authRoutes")(app);

app.get("/", function (req, res) {
  res.send({ hi: "basti" });
});

// app.get("/auth/github", (req, res) => {
//   res.send;
// });

// app.get("/auth/github/callback?code=3434", (req, res) => {
//   res.send;
// });

app.listen(process.env.PORT || 5000, function () {
  console.log(
    "Express server listening on port %d in %s mode",
    this.address().port,
    app.settings.env
  );
});
