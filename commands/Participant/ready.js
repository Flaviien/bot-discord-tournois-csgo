module.exports.run = async (client, message, args) => {
  const discordMember = message.member;
  const member = await client.getMember(discordMember.nickname ? discordMember.nickname : discordMember.user.username);
  const team = await member.getTeam();
  const meetings = await team.getMeetings();
  let meeting;
  for (const m of meetings) {
    if (m.winner === null) {
      meeting = m;
    }
  }

  const channel = message.guild.channels.cache.get(meeting.channelId);
  const match = client.matches.get(team.name);
  client.matches.set(team.name, { matchId: match.matchId, checkin: 2 });
  channel.send(`${team.name} est là !`);
};

module.exports.help = {
  name: 'ready',
  aliases: ['ready'],
  category: 'Participant',
  description: 'Permet à une équipe de valider son checkin',
  cooldown: 0,
  usage: '',
  options: {},
  canAdminMention: false,
  isPermissionsRequired: false,
  isArgumentRequired: false,
  needUserMention: false,
  needRoleMention: false,
};
