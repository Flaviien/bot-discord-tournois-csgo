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
  description: 'Répond pong et les latences du bot / API',
  cooldown: 10,
  usage: '',
  options: {},
  canAdminMention: false,
  isPermissionsRequired: false,
  isArgumentRequired: false,
  needUserMention: false,
  needRoleMention: false,
};

/*
cooldown: 5 secondes par défaut
canAdminMention: //si false = On ne peux pas mentionner un Admin
isPermissionsRequired: //si true = commande uniquement disponible si l'utilisateur à la permission BAN_MEMBERS
isArgumentRequired: //si true = Un argument au moins est requis
needUserMention: //si true = On doit mentionner quelqu'un (sauf un bot)
needRoleMention: //si true = On doit mentionner un role
*/
