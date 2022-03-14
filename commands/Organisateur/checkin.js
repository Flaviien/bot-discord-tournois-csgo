module.exports.run = async (client, message, args, options) => {
  const meetings = await client.getMeetings();

  if (meetings.length < client.settings.nbrTeams / 2) {
    return message.channel.send(`Veuillez finaliser l'arbre initial avant de : ${meetings.length}/${client.settings.nbrTeams / 2}`);
  }

  const meeting = await client.getMeetingByChannelId(message.channel.id);

  if (meeting == null) {
    return message.channel.send(`Cette commande fonctionne uniquement dans les channels des rencontres`);
  }

  const teams = await meeting.getTeams();

  for (const team of teams) {
    client.meetings.set(team.name, { id: meeting.id, checkin: 1 });
    setTimeout(() => {
      if (client.meetings.get(team.name).checkin === 1) {
        client.meetings.delete(team.name);

        message.channel.send(`L'équipe ${team.name} ne s'est pas présentée à temps !`);
        console.log(`L'équipe ${team.name} ne s'est pas présentée à temps !`);
      } else if (client.meetings.get(team.name).checkin === 2) {
        client.meetings.delete(team.name);
        console.log(`[CONSOLE] L'équipe ${team.name} s'est bien présentée.`);
      }
    }, 60000 * client.settings.checkinTimer);
  }

  message.channel.send(`${teams[0].name} & ${teams[1].name}, merci de vous présenter en tappant la commande ***${client.settings.prefix}ready***`);
};

module.exports.help = {
  name: 'checkin',
  aliases: ['checkin'],
  description: 'Lance le checkin du match',
  usage: '',
  options: {
    '--delay': 'Stop le chrono mais laisse le droit aux équipes de faire la commande "ready"',
  },
  canAdminMention: false,
  canUserMention: false,
  canRoleMention: false,
  isPermissionsRequired: true,
  isArgumentRequired: false,
  isUserMentionRequired: false,
  isRoleMentionRequired: false,
};
