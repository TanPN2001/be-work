const bcrypt = require("bcrypt");

const config = require("../../configs/config");
const jwt = require("../../middleware/jwt");

const User = require("../../models/User.model");
const Image = require("../../models/Image.model");
const { uploadToCloudinary } = require("../../services/cloudinary");
const UploadImg = require("../../services/Image.Service");
const {
  editProfileService,
  getUserService,
  getNumUserService,
  getNumWorkService,
  getNumCompanyService,
} = require("../../services/Common.Service");

const register = async (req, res) => {
  try {
    const { fullName, email, password, role } = req.body;
    const userFind = await User.findOne({ email: email });
    if (role !== 1 && role !== 2)
      return res.status(400).send({
        status: config.STATUS.BAD_REQUEST,
        message: "Check role against",
      });

    if (!userFind) {
      const hash = bcrypt.hashSync(password, 10);
      const user = new User({
        fullName,
        email,
        password: hash,
        role: role,
      });

      await user.save();
      return res.status(200).send({
        status: config.STATUS.OK,
        msg: "Register successful !!!",
      });
    } else {
      return res.status(400).send({
        status: config.STATUS.BAD_REQUEST,
        massage: "Email is exist !!!",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      status: config.STATUS.INTERNAL_SERVER_ERROR,
      msg: "Error server !!!",
    });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email });

  if (user) {
    const hashPass = bcrypt.compareSync(password, user.password);

    if (hashPass) {
      const access_token = jwt.signToken(
        {
          email,
          tokenType: config.TOKENTYPE.accessToken,
          role: user.role,
        },
        "1h"
      );

      const refresh_token = jwt.signToken(
        {
          email,
          tokenType: config.TOKENTYPE.refreshToken,
          role: user.id,
        },
        "1h"
      );

      const [accessToken, refreshToken] = await Promise.all([
        access_token,
        refresh_token,
      ]);

      user.accessToken = accessToken;
      user.refreshToken = refreshToken;

      await user.save();

      return res.status(200).send({
        status: config.STATUS.OK,
        massage: "Login successful !!!",
        data: user,
      });
    } else {
      res.status(400).send({
        status: config.STATUS.BAD_REQUEST,
        massage: "Password is incorrect !!!",
      });
    }
  } else {
    res.status(400).send({
      status: config.STATUS.BAD_REQUEST,
      massage: "Email is not exist !!!",
    });
  }
};

const postImage = async (req, res) => {
  const result = await UploadImg(req.file);
  return res.send(result);
};

const editProfile = async (req, res) => {
  const { id } = req.query;
  const { email, password, phone, fullname } = req.body;
  const result = await editProfileService(
    { email, password, phone, fullname },
    id
  );
  if (result) return res.send(result);

  return res.send({
    result: "server error",
  });
};

const getProfile = async (req, res) => {
  const { id } = req.query;
  const result = await getUserService(id);
  if (result) return res.send(result);

  return res.send({
    result: "failed",
  });
};

const getNumUser = async (req, res) => {
  const result = await getNumUserService();

  if (result) return res.status(200).send(result);

  return res.status(500).send({
    result: "failed",
    reason: "Server error",
  });
};

const getNumCompany = async (req, res) => {
  const result = await getNumCompanyService();

  if (result) return res.status(200).send(result);

  return res.status(500).send({
    result: "failed",
    reason: "Server error",
  });
};

const getNumWork = async (req, res) => {
  const result = await getNumWorkService();

  if (result) return res.status(200).send(result);

  return res.status(500).send({
    result: "failed",
    reason: "Server error",
  });
};

module.exports = {
  register,
  login,
  postImage,
  editProfile,
  getProfile,
  getNumUser,
  getNumCompany,
  getNumWork
};
