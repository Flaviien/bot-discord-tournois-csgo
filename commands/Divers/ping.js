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
  description: "Donne latences du bot et de l'API",
  cooldown: 10,
  usage: '',
  canAdminMention: false,
  canUserMention: false,
  canRoleMention: false,
  isPermissionsRequired: true,
  isArgumentRequired: false,
  isUserMentionRequired: false,
  isRoleMentionRequired: false,
};

/*
cooldown: 5 secondes par défaut
canAdminMention: //si false = On ne peut pas mentionner un Admin
canUserMention: //si false = On ne peut mentionner personne
canRoleMention: //si false = On ne peut mentionner aucun rôle
isPermissionsRequired: //si true = commande uniquement disponible si l'utilisateur à la permission BAN_MEMBERS
isArgumentRequired: //si true = Un argument au moins est requis
isUserMentionRequired: //si true = On doit mentionner quelqu'un (sauf un bot)
isRoleMentionRequired: //si true = On doit mentionner un role
*/
