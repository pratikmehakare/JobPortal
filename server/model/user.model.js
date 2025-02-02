const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  company: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  employeesize: {
    type: Number,
    required: true,
  },
});

const User = mongoose.model('User', UserSchema);
module.exports = User;
