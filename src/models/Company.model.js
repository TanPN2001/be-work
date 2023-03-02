const mongoose = require("mongoose");
const CompanyShema = new mongoose.Schema({
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

const Company = mongoose.model("companies", CompanyShema);
module.exports = Company;
