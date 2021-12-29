module.exports.run = async (client, message, args) => {
  if (args[0] !== 'true' && args[0] !== 'false') return;
  message.channel.send(await client.updateVeto(args[0]));
};

module.exports.help = {
  name: 'veto',
  aliases: ['veto'],
  category: 'Organisateur',
  description:
    'Active ou désactive la fonction veto. Start: Lance la fonction manuellement',
  usage: '<true/false/start>',
  adminMention: false,
  permissions: true,
  args: true,
  mention: false,
};
