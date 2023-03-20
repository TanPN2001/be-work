const User = require("../models/User.model");
const jwt = require("./jwt");

const isAuthenticated = async (req, res, next) => {
  try {
    if (req.headers["authorization"]) {
      const token = req.headers["authorization"].split(" ")[1];
      const decodeToken = await jwt.verifyToken(token);

      const user = await User.findOne({
        email: decodeToken.email,
      });

      if (user) {
        return await next();
      }
    }

    return res.send({
      result: "Unauthorized",
      reason: "You need Sign in",
    });
  } catch (error) {
    res.send({
      result: "failed",
      detail: error,
    });
  }
};

const isAdmin = async (req, res, next) => {
  try {
    if (req.headers["authorization"]) {
      const token = req.headers["authorization"].split(" ")[1];
      const decodeToken = await jwt.verifyToken(token);

      const user = await User.findOne({
        $and: [{ email: decodeToken.email, role: 0 }],
      });

      if (user) {
        return await next();
      }
    }

    return res.send({
      result: "Unauthorized",
      reason: "You need Sign in",
    });
  } catch (error) {
    res.send({
      result: "failed",
      detail: error,
    });
  }
};

const isCompany = async (req, res, next) => {
  try {
    if (req.headers["authorization"]) {
      const token = req.headers["authorization"].split(" ")[1];
      const decodeToken = await jwt.verifyToken(token);

      const user = await User.findOne({
        email: decodeToken.email,
        $or: [{role: 0, role: 1}]
      });

      if (user) {
        return await next();
      }
    }

    return res.send({
      result: "Unauthorized",
      reason: "You need Sign in",
    });
  } catch (error) {
    res.send({
      result: "failed",
      detail: error,
    });
  }
}

const isUser = async (req, res, next) => {
  try {
    if (req.headers["authorization"]) {
      const token = req.headers["authorization"].split(" ")[1];
      const decodeToken = await jwt.verifyToken(token);

      const user = await User.findOne({
        email: decodeToken.email,
        $or: [{role: 0, role: 2}]
      });

      if (user) {
        return await next();
      }
    }

    return res.send({
      result: "Unauthorized",
      reason: "You need Sign in",
    });
  } catch (error) {
    res.send({
      result: "failed",
      detail: error,
    });
  }
}

module.exports = { isAuthenticated, isAdmin, isCompany, isUser };
