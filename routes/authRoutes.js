//its the module not the file
const passport = require("passport");

module.exports = (app) => {
  //kick the user in the oauth flow handled by passport
  app.get(
    "/auth/google",
    passport.authenticate("google", {
      // scopes are pre-defined by google
      scope: ["profile", "email"],
    })
  );

  // automatically recognizes the code within the callback response
  app.get("/auth/google/callback", passport.authenticate("google"));

  app.get("/api/logout", (req, res) => {
    //kills the cookie
    req.logout();
    res.send(req.user);
  });

  app.get("/api/current_user", (req, res) => {
    res.send(req.user);
  });
};
