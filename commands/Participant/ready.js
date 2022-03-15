module.exports.run = async (client, message, args) => {
  const discordMember = message.member;
  const member = await client.getMember(discordMember.nickname || discordMember.user.username);
  const team = await member?.getTeam();
  if (team == null) return;

  const clientMeeting = client.meetings.get(team.name);
  if (clientMeeting == null) return;

  const meeting = await client.getMeetingByChannelId(message.channel.id);
  if (meeting == null) {
    return message.channel.send(`Cette commande fonctionne uniquement dans les channels des rencontres`);
  }

  if (clientMeeting.checkin === 1) {
    client.meetings.set(team.name, { id: meeting.id, checkin: 2, timer: clientMeeting.timer });
    message.channel.send(`${team.name} est là !`);

    const clientMeetings = client.meetings.filter((m) => m.id === clientMeeting.id);
    if (clientMeetings.size !== 2) {
      return message.channel.send(client.config.ERROR_MESSAGE);
    }
    if (clientMeetings.at(0).checkin === 2 && clientMeetings.at(1).checkin === 2) {
      return message.channel.send(`Le match va commencer`);
    }
  }
  if (clientMeeting.checkin === 2) {
    message.channel.send(`${team.name} s'est déjà présentée`);
  }
};

module.exports.help = {
  name: 'ready',
  aliases: ['ready'],
  description: 'Permet à une équipe de valider son checkin',
  cooldown: 0,
  usage: '',
  canAdminMention: false,
  canUserMention: false,
  canRoleMention: false,
  isPermissionsRequired: false,
  isArgumentRequired: false,
  isUserMentionRequired: false,
  isRoleMentionRequired: false,
};
