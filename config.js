const privateEnv = require('./private-env');
const db = require('./database/models/index.js');

module.exports = {
  TOKEN: privateEnv.TOKEN,
  DBCONNECTION: db,
  DEFAULTSETTINGS: {
    permissions: privateEnv.DEFAULTSETTINGS.permissions,
    prefix: privateEnv.DEFAULTSETTINGS.prefix,
    nbrTeams: privateEnv.DEFAULTSETTINGS.nbrTeams,
    checkinTimer: privateEnv.DEFAULTSETTINGS.checkinTimer,
    veto: privateEnv.DEFAULTSETTINGS.veto,
    BO: privateEnv.DEFAULTSETTINGS.BO,
  },
  CHANNELS_ID: {
    logChannel: privateEnv.CHANNELS_ID.logChannel,
  },
  CATEGORIES_CHANNELS_ID: {
    stage8: privateEnv.CATEGORIES_CHANNELS_ID.stage8,
    stage4: privateEnv.CATEGORIES_CHANNELS_ID.stage4,
    stage2: privateEnv.CATEGORIES_CHANNELS_ID.stage2,
    stage1: privateEnv.CATEGORIES_CHANNELS_ID.stage1,
  },
  ERROR_MESSAGE: privateEnv.ERROR_MESSAGE,
};
