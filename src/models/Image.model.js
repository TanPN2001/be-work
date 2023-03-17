const mongoose = require("mongoose");
const ImageShema = new mongoose.Schema({
  publicId: { type: String },
  data: { type: String },
  createdAt: { type: Date },
  updatedAt: { type: Date },
});

const Image = mongoose.model("images", ImageShema);
module.exports = Image;
