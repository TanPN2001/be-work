const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");
const PermisstionShema = new mongoose.Schema({
  per_name: {
    type: String,
  },
  per_description: {
    type: String,
  },
  createdAt: {
    type: Date,
  },
  updatedAt: { type: Date },
});

const Permissions = mongoose.model("permissions", PermisstionShema);
module.exports = Permissions;
