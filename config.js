const privateEnv = require('./private-env');
const db = require('./database/models/index.js');

module.exports = {
  TOKEN: privateEnv.TOKEN,
  DBCONNECTION: db,
  DEFAULTSETTINGS: {
    prefix: privateEnv.DEFAULTSETTINGS.prefix,
    logChannel: privateEnv.DEFAULTSETTINGS.logChannel,
  },
};
