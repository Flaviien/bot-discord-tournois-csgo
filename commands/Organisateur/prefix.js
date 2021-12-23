module.exports.run = async (client, message, args) => {
  if (args[0].length > 2) return;
  message.channel.send(await client.updatePrefix(args[0]));
};

module.exports.help = {
  name: 'prefix',
  aliases: ['prefix'],
  category: 'Organisateur',
  description: 'Change le prefix des commandes',
  usage: '<nouveau_prefix>',
  adminMention: false,
  permissions: true,
  args: true,
  mention: false,
};
