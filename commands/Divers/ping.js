module.exports.run = async (client, message, args) => {
  const msg = await message.reply('Pong !');

  console.log('Pong !');

  msg.edit(`
  Pong !
  Latence du bot: ${msg.createdTimestamp - message.createdTimestamp}ms
  Latence de l'API: ${Math.round(client.ws.ping)}ms
  `);
};

module.exports.help = {
  name: 'ping',
  aliases: ['ping', 'test'],
  category: 'Divers',
  description: 'Répond pong',
  usage: '',
  adminMention: false,
  permissions: false,
  args: false,
  mention: false,
};

/*
adminMention: false, //false = On ne peux pas mentionner un Admin
permissions: false, //true = Si l'utilisateur à la permission BAN_MEMBERS
args: false, //true = Un argument au moins est requis
mention: false //true = On doit mentionner quelqu'un (sauf un bot)
*/
