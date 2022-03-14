module.exports.run = async (client, message, args) => {
  //ex: !sone 12
  const match = await client.getMatch(args[0]);
  if (match.subId !== 3 && match.subId !== 4 && match.subId !== 5 && match.status !== 'playing') await client.updateMatch(match.id, 'status', 'playing');
  if (match.maps_id !== 1) await client.updateMatch(match.id, 'maps_id', 1);
  if (match.winner !== null) await client.updateMatch(match.id, 'winner', null);
  if (match.score !== null) await client.updateMatch(match.id, 'score', null);

  const meeting = await match.getMeeting();
  await client.updateMeeting(meeting.id, 'winner', null);
};

module.exports.help = {
  name: 'setmapone',
  aliases: ['setmapone', 'sone'],
  description: 'Help for development',
  usage: '',
  canAdminMention: false,
  canUserMention: true,
  canRoleMention: true,
  isPermissionsRequired: false,
  isArgumentRequired: false,
  isUserMentionRequired: false,
  isRoleMentionRequired: false,
};
