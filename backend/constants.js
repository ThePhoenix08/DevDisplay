const Constants = {
  ENV: process.env.NODE_ENV || "development",
  PORT: process.env.PORT || 3000,
  MONGODB_URI: process.env.MONGODB_URI || "mongodb://localhost:27017/devdisplay",
  ORIGIN_URL: process.env.ORIGIN_URL || "http://localhost:3000",
  JSON_LIMIT: process.env.JSON_LIMIT || "100kb",
  USERNAME_MINLEN: process.env.USERNAME_MINLEN || 3,
};

export default Constants;