module.exports.run = async (client, message, args) => {
  if (args[0] !== 'true' && args[0] !== 'false') return;
  message.channel.send(await client.updatePermission(args[0]));
};

module.exports.help = {
  name: 'permission',
  aliases: ['permission', 'perm'],
  category: 'Organisateur',
  description:
    'Ajoute ou retire la permission aux partipants de tapper des commandes de tournoi',
  usage: '<true/false>',
  adminMention: false,
  permissions: true,
  args: true,
  mention: false,
};
