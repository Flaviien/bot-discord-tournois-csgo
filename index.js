const Discord = require('discord.js');
const messageCreate = require('./events/message/messageCreate');
const { loadCommands, loadEvents } = require('./utils/loader');

let intents = new Discord.Intents(Discord.Intents.NON_PRIVILEGED);
intents.add('GUILD_MEMBERS');
intents.add('GUILDS');
intents.add('GUILD_MESSAGES');

const client = new Discord.Client({
  intents: intents,
});

require('./utils/functions')(client);
client.config = require('./config');
client.sequelize = require('./utils/sequelize');
client.commands = new Discord.Collection();

loadCommands(client);
loadEvents(client);

client.login(client.config.TOKEN);

// console.log(client);
