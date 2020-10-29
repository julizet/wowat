// keys.js figure out what credentials to return
if (process.env.NODE_ENV === "production") {
  // we are in production
  // return prod set of keys
  module.exports = require("./prod");
} else {
  // we are in dev
  // this is always the case when running on local machine
  module.exports = require("./dev");
}
