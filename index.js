const Discord = require('discord.js');
const { loadCommands, loadEvents } = require('./utils/loader');

let intents = new Discord.Intents(Discord.Intents.NON_PRIVILEGED);
intents.add('GUILD_MEMBERS');
intents.add('GUILDS');
intents.add('GUILD_MESSAGES');

const client = new Discord.Client({
  intents: intents,
});

['commands', 'cooldowns'].forEach((x) => (client[x] = new Discord.Collection()));

require('./utils/db_functions/index')(client);
require('./utils/discordjs_functions/index')(client);
client.config = require('./config');
client.settings = {};
client.commands = new Discord.Collection();
client.matches = new Discord.Collection();

loadCommands(client);
loadEvents(client);

client.login(client.config.TOKEN);

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
