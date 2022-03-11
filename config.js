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
    BO_stage8: privateEnv.DEFAULTSETTINGS.BO_stage8,
    BO_stage4: privateEnv.DEFAULTSETTINGS.BO_stage4,
    BO_stage2: privateEnv.DEFAULTSETTINGS.BO_stage2,
    BO_stage1: privateEnv.DEFAULTSETTINGS.BO_stage1,
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
