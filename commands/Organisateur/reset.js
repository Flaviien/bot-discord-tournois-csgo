module.exports.run = async (client, message, args) => {
  await client.removeTeams();
  await client.removeMeetings();
};

module.exports.help = {
  name: 'reset',
  aliases: ['reset'],
  category: 'Organisateur',
  description: 'Reset le tournoi',
  usage: '',
  adminMention: false,
  permissions: true,
  args: false,
  mention: false,
};
