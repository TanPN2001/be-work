const mongoose = require("mongoose");
const AdminShema = new mongoose.Schema({
  fullName: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  accessToken: {
    type: String,
  },
  refreshToken: {
    type: String,
  },
  role: {
    type: Number,
  }
});

const Admin = mongoose.model("admins", AdminShema);
module.exports = Admin;
