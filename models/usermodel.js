const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    hashedPassword: String,
  });
  //const User = mongoose.model("User", userSchema);
  module.exports = mongoose.model("User", userSchema);