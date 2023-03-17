const mongoose = require("mongoose");
const WorkShema = new mongoose.Schema({
  title: String,
  description: String,
  image: String,
  createdAt: {
    type: Date,
  },
  updatedAt: { type: Date },
});

const Work = mongoose.model("works", WorkShema);
module.exports = Work;
