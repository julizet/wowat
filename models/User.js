//create mongoose model class

const mongoose = require("mongoose");
// const Schema = mongoose.Schema;
const { Schema } = mongoose;

const userSchema = new Schema({
  googleId: String,
  googleName: String,
  firstName: String,
  lastName: String,
  email: String,
  location: String,
});

// first argument is the collection, secnd the Schema
// this function loads a Schema into mongoose which loads it into MongoDB
// if collections already exists --> merges NOT overrides ist
mongoose.model("users", userSchema);
