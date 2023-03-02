const bcrypt = require("bcrypt");
const Candidate = require("../../models/Candidate.model");
const config = require("../../configs/config");
const jwt = require("../../middleware/jwt");

const register = async (req, res) => {
  const { fullName, email, password } = req.body;
  const candidateFind = await Candidate.findOne({ email: email });

  if (!candidateFind) {
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

      const candidate = new Candidate({
        fullName,
        email,
        password: hash,
        accessToken,
        refreshToken,
      });

      await candidate.save();
      res.status(200).send({
        status: config.STATUS.OK,
        msg: "Register successful !!!",
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        status: config.STATUS.INTERNAL_SERVER_ERROR,
        msg: "Error server !!!",
      });
    }
  } else {
    res.status(400).send({
      status: config.STATUS.BAD_REQUEST,
      massage: "Email is exist !!!",
    });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await Candidate.findOne({ email: email });

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
