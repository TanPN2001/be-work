const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");
const RolePermissionShema = new mongoose.Schema({
  role_id: {
    type: ObjectId,
  },
  per_id: {
    type: ObjectId,
  },
  createdAt: {
    type: Date,
  },
  updatedAt: { type: Date },
});

const RolePermission = mongoose.model("role_permissions", RolePermissionShema);
module.exports = RolePermission;
