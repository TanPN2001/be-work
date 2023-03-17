const User = require("../models/User.model");

const editProfileService = async (data, id) => {
  try {
    const user = await User.findById({
      id: id,
    });

    if (user) {
      user.updateOne({
        email: data.email,
        password: data.password,
        phone: data.phone,
        fullname: data.fullname,
      });

      await user.save();

      return user;
    }

    return {
      result: "failed",
      reason: "not found user",
    };
  } catch (error) {
    return {
      result: "failed",
      error: error,
    };
  }
};

const getUserService = async (id) => {
  try {
    const user = await User.findById({
      _id: id,
    });

    if (user)
      return {
        result: "success",
        user: user,
      };

    return {
      result: "failed",
      reason: "not found user",
    };
  } catch (error) {
    return {
      result: "failed",
      error: error,
    };
  }
};

module.exports = { editProfileService, getUserService };
