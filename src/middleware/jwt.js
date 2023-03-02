const jwt = require("jsonwebtoken");
const config = require("../configs/config");

const signToken = (payload, token_life) => {
  return new Promise((resolve, reject) => {
    jwt.sign(
      payload,
      config.CONFIG.secret,
      { expiresIn: token_life },
      (err, token) => {
        if (err) reject(err);
        resolve(token);
      }
    );
  });
};

const verifyToken = (token, tokenType = "ACCESS_TOKEN") => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, config.CONFIG.secret, (err, decode) => {
            if(err) {
                if(err.name === 'TokenExpiredError') {
                    reject({
                        status: config.STATUS.UNAUTHORIZED,
                        error: {
                            message: `${tokenType} dated`,
                            name: `EXPIRED ${tokenType}`
                        }
                    })
                }
                reject({
                    status: config.STATUS.UNAUTHORIZED,
                    error: {
                        message: `${tokenType} incorrect`,
                        name: `INVALID ${tokenType}`
                    }
                })
            }
            resolve(decode)
        })
    })
}

module.exports = {signToken, verifyToken}


