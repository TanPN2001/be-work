const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");
const UserShema = new mongoose.Schema({
  role_id: {
    type: ObjectId,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  fullname: {
    type: String,
  },
  phone: {
    type: String,
  },
  accessToken: {
    type: String,
  },
  refreshToken: {
    type: String,
  },
  createdAt: {
    type: Date,
  },
  updatedAt: { type: Date },
});

const User = mongoose.model("users", UserShema);
module.exports = User;
