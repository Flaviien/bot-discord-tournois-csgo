const db = require('../../database/models/index.js');

module.exports = async (client) => {
  console.log(`Logged in as ${client.user.tag}!`);

  try {
    await db.sequelize.authenticate();
    console.log('Connection to the DB has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }

  client.user.setPresence({
    activity: [{ name: `${client.settings.prefix}help pour plus d'infos`, type: 'PLAYING' }],
    status: 'online',
  });

  //Fonction pour inclure les settings sur le client. Pour éviter les appels à la DB
  for (const setting in client.config.DEFAULTSETTINGS) {
    (async () => {
      client
        .getSetting(`${setting}`)
        .then((s) => {
          if (s == null) {
            if (client.config.DEFAULTSETTINGS[setting] == null) {
              throw s;
            } else {
              client.settings[setting] = client.config.DEFAULTSETTINGS[setting];
            }
          } else {
            client.settings[setting] = s;
          }
        })
        .catch((e) => {
          console.error(e);
        });
    })();
  }
};
