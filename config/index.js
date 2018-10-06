const util = require("util");
let defaultConfig = {};
try {
  defaultConfig = require("../local_config");
} catch(e) {
  util.log("coud not find local_config.js");
}

console.log(defaultConfig);

module.exports = {
  DB: {
    HOST: process.env.DB_HOST || defaultConfig.DB_HOST,
    USER: process.env.DB_USER || defaultConfig.DB_USER,
    PASSWORD: process.env.DB_PASSWORD || defaultConfig.DB_PASSWORD,
    NAME: process.env.DB_NAME || defaultConfig.DB_NAME,
    PORT: process.env.DB_PORT || defaultConfig.DB_PORT,
  }
};
