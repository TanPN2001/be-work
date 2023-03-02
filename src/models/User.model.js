const mongoose = require("mongoose");
const UserShema = new mongoose.Schema({
  fullName: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  role: {
    type: Number,
  },
  accessToken: {
    type: String,
  },
  refreshToken: {
    type: String,
  },
});

const User = mongoose.model("users", UserShema);
module.exports = User;
