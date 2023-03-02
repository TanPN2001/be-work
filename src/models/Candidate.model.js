const mongoose = require("mongoose");
const CandidateShema = new mongoose.Schema({
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

const Candidate = mongoose.model("candidates", CandidateShema);
module.exports = Candidate;
