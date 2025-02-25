import dotenv from 'dotenv';

dotenv.config();

const Constants = {
  ENV: process.env.NODE_ENV || "development",
  PORT: process.env.PORT || 3000,
  MONGODB_URI: process.env.MONGODB_URI || "mongodb://localhost:27017/devdisplay",
  ORIGIN_URL: process.env.ORIGIN_URL || "http://localhost:3000",
  JSON_LIMIT: process.env.JSON_LIMIT || "100kb",
  USERNAME_MINLEN: process.env.USERNAME_MINLEN || 3,
  FULLNAME_MAXLEN: process.env.FULLNAME_MAXLEN || 50,
  FULLNAME_MINLEN: process.env.FULLNAME_MINLEN || 3,
  LOCATION_MAXLEN: process.env.LOCATION_MAXLEN || 50,
  LOCATION_MINLEN: process.env.LOCATION_MINLEN || 3,
  BIO_MAXLEN: process.env.BIO_MAXLEN || 500,
  BIO_MINLEN: process.env.BIO_MINLEN || 3,
  SALT_ROUNDS: Number(process.env.SALT_ROUNDS) || 10,
  JWT_ALGORITHM: process.env.JWT_ALGORITHM,
  REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET,
  ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_MAXAGE: process.env.REFRESH_TOKEN_MAXAGE,
  ACCESS_TOKEN_MAXAGE: process.env.ACCESS_TOKEN_MAXAGE,
};

export default Constants;