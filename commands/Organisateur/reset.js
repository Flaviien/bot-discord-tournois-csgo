module.exports.run = async (client, message, args) => {
  const resetAll = args.find((x) => x.toLowerCase() === '--reset-all');
  const resetMeetings = args.find((x) => x.toLowerCase() === '--matches');

  if (resetAll !== undefined) {
    await client.removeTeams();
    await client.removeMeetings();
  }

  if (resetMeetings !== undefined) {
    await client.removeMeetings();
  }
};

module.exports.help = {
  name: 'reset',
  aliases: ['reset'],
  category: 'Organisateur',
  description: 'Reset le tournoi. Attention, la commande ne demande pas de confirmation.',
  usage: '',
  options: {
    '--reset-all': 'Reset tout le tournoi',
    '--matches': 'Reset uniquement les matchs',
  },
  canAdminMention: false,
  isPermissionsRequired: true,
  isArgumentRequired: false,
  needUserMention: false,
  needRoleMention: false,
};
