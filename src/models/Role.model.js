const mongoose = require("mongoose");
const RoleShema = new mongoose.Schema({
  role: {
    type: Number,
  },
  nameRole: {
    type: String
  }
});

const Role = mongoose.model("roles", RoleShema);
module.exports = Role;


// id_role
// role
// nameRole

