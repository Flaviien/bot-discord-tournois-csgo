module.exports.run = async (client, message, args) => {
  const matches = await client.getMatches();
  matches.forEach(async (m) => {
    if (m.subId !== 3 && m.subId !== 4 && m.subId !== 5 && m.status !== 'playing') await client.updateMatch(m.id, 'status', 'playing');
    if (m.maps_id !== 1) await client.updateMatch(m.id, 'maps_id', 1);
    if (m.winner !== null) await client.updateMatch(m.id, 'winner', null);
    if (m.score !== null) await client.updateMatch(m.id, 'score', null);
  });
};

module.exports.help = {
  name: 'setmapall',
  aliases: ['setmapall', 'set'],
  description: 'Help for development',
  cooldown: 3,
  usage: '',
  canAdminMention: false,
  canUserMention: false,
  canRoleMention: false,
  isPermissionsRequired: true,
  isArgumentRequired: false,
  isUserMentionRequired: false,
  isRoleMentionRequired: false,
};
