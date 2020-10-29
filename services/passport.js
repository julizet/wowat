const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const mongoose = require("mongoose");
const keys = require("../config/keys");

// getting access to user model class
const User = mongoose.model("users");

// first argument is user model
// done is a callback that we call after we have done some work
passport.serializeUser((user, done) => {
  //user.id will be identifying piece of information that we need fo steady & consistent authentification
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null, user);
  });
});

// function to create new instance
// first var is the constructor // second var is the function
passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback",
      proxy: true,
    },
    (accessToken, refreshToken, profile, done) => {
      //search if users already exists
      //this returns a promise
      User.findOne({ googleId: profile.id }).then((existingUser) => {
        if (existingUser) {
          // user already exists
          done(null, existingUser);
        } else {
          //create new user record for database
          new User({
            googleId: profile.id,
            googleName: profile.displayName,
            firstName: profile.name.familyName,
            lastName: profile.name.givenName,
            email: profile.emails[0].value,
            location: profile._json.locale,
          })
            .save()
            .then((user) => done(null, user));
        }
      });
    }
  )
);
