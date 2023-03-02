const dotenv = require("dotenv");
dotenv.config();

const STATUS = {
  OK: 200,
  CONTINUE: 100,
  GATEWAY_TIMEOUT: 504,
  REQUEST_TIMEOUT: 408,
  UNAUTHORIZED: 401,
  UNPROCESSABLE_ENTITY: 422,
  UNSUPPORTED_MEDIA_TYPE: 415,
  TOO_MANY_REQUESTS: 429,
  INTERNAL_SERVER_ERROR: 500,
  BAD_GATEWAY: 502,
  BAD_REQUEST: 400,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  NOT_ACCEPTABLE: 406,
};

const TOKENTYPE = {
  accessToken: "ACCESS_TOKEN",
  refreshToken: "REFRESH_TOKEN",
};

const CONFIG = {
  port: process.env.PORT,
  secret: process.env.SECRET,
  bcrypt_salt: process.env.SALT,
  jwt_expire_access_token: 2,
  jwt_expire_refresh_token: "1h",
};
module.exports = {
  STATUS,
  TOKENTYPE,
  CONFIG,
};
