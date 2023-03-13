const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");
const RoleShema = new mongoose.Schema({
  user_id: {
    type: ObjectId,
  },
  role_name: {
    type: Number,
  },
  role_discription: {
    type: String,
  },
  createdAt: {
    type: Date,
  },
  updatedAt: { type: Date },
});

const Role = mongoose.model("roles", RoleShema);
module.exports = Role;

// id_role
// role
// nameRole
