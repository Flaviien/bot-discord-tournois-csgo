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
client.commands = new Discord.Collection();
client.matches = new Discord.Collection();

loadCommands(client);
loadEvents(client);

client.login(client.config.TOKEN);

//Fonction pour inclure le prefix sur le client. Pour éviter les appels à la DB
(async () => {
  client
    .getSetting('prefix')
    .then((prefix) => {
      if (prefix == null) {
        if (client.config.DEFAULTSETTINGS.prefix == null) {
          throw prefix;
        } else {
          client.prefix = client.config.DEFAULTSETTINGS.prefix;
        }
      } else {
        client.prefix = prefix;
      }
    })
    .catch((e) => {
      console.error(e);
    });
})();
