const bcrypt = require("bcrypt");

const config = require("../../configs/config");
const jwt = require("../../middleware/jwt");

const Candidate = require("../../models/Candidate.model");
const Admin = require("../../models/Admin.model");
const Company = require("../../models/Company.model");
const User = require("../../models/User.model");

const register = async (req, res) => {
  const { fullName, email, password, role } = req.body;

  const candidateFind = await Candidate.findOne({ email: email });
  const adminFind = await Admin.findOne({ email: email });
  const companyFind = await Company.findOne({ email: email });
  const userFind = await Company.findOne({ email: email });

  if (!userFind) {
    try {
      const hash = bcrypt.hashSync(password, 10);

      const access_token = jwt.signToken(
        {
          email,
          tokenType: config.TOKENTYPE.accessToken,
        },
        config.CONFIG.jwt_expire_access_token
      );

      const refresh_token = jwt.signToken(
        {
          email,
          tokenType: config.TOKENTYPE.refreshToken,
        },
        config.CONFIG.jwt_expire_refresh_token
      );

      const [accessToken, refreshToken] = await Promise.all([
        access_token,
        refresh_token,
      ]);

      const user = new User({
        fullName,
        email,
        password: hash,
        role,
        accessToken,
        refreshToken,
      });

      await user.save();
      return res.status(200).send({
        status: config.STATUS.OK,
        msg: "Register successful !!!",
      });
    } catch (error) {
      console.log(error);
      return res.status(500).send({
        status: config.STATUS.INTERNAL_SERVER_ERROR,
        msg: "Error server !!!",
      });
    }
  } else {
    return res.status(400).send({
      status: config.STATUS.BAD_REQUEST,
      massage: "Email is exist !!!",
    });
  }
};

const login = async (req, res) => {
  const { email, password, role } = req.body;
  const user = await User.findOne({ email: email, role: role });

  if (user) {
    const hashPass = bcrypt.compareSync(password, user.password);

    if (hashPass) {
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

module.exports = {
  register,
  login,
};
