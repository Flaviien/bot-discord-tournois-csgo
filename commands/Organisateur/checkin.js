module.exports.run = async (client, message, args, options) => {
  const stop = options.find((x) => x.toLowerCase() === '--stop');
  const delay = options.find((x) => x.toLowerCase() === '--delay');
  const meetings = await client.getMeetings();

  if (meetings.length < client.settings.nbrTeams / 2) {
    return message.channel.send(`Veuillez finaliser l'arbre initial avant de lancer les checkins : ${meetings.length}/${client.settings.nbrTeams / 2}`);
  }

  const meeting = await client.getMeetingByChannelId(message.channel.id);

  if (meeting == null) {
    return message.channel.send(`Cette commande fonctionne uniquement dans les channels des rencontres`);
  }

  const teams = await meeting.getTeams();

  if (teams == undefined) {
    return message.channel.send(client.config.ERROR_MESSAGE);
  }
  if (teams.length != 2) {
    return message.channel.send(client.config.ERROR_MESSAGE);
  }

  if (stop) {
    for (const team of teams) {
      if (client.meetings.get(team.name) == undefined) {
        return;
      }
      clearTimeout(client.meetings.get(team.name).timer);
      client.meetings.delete(team.name);
    }
    return;
  }

  if (delay) {
    for (const team of teams) {
      if (client.meetings.get(team.name) == undefined) {
        return;
      }
      clearTimeout(client.meetings.get(team.name).timer);
    }
    return;
  }

  for (const team of teams) {
    //test si le checkin est déjà lancé
    const clientMeeting = client.meetings.get(team.name);
    if (clientMeeting != undefined) {
      return message.channel.send(`Le timer a déjà été lancé. Attendez les équipes ou utilisez les options: --stop ou --delay`);
    }

    //Lance le timer
    const timer = setTimeout(() => {
      if (client.meetings.get(team.name) == undefined) {
        return message.channel.send(client.config.ERROR_MESSAGE);
      } else {
        if (client.meetings.get(team.name).checkin === 1) {
          client.meetings.delete(team.name);

          message.channel.send(`L'équipe ${team.name} ne s'est pas présentée à temps !`);
          console.log(`L'équipe ${team.name} ne s'est pas présentée à temps !`);
        } else if (client.meetings.get(team.name).checkin === 2) {
          client.meetings.delete(team.name);
          console.log(`[CONSOLE] L'équipe ${team.name} s'est bien présentée.`);
        }
      }
    }, 2500 * client.settings.checkinTimer);

    //set
    client.meetings.set(team.name, { id: meeting.id, checkin: 1, timer });
  }

  message.channel.send(`${teams[0].name} & ${teams[1].name}, merci de vous présenter en tappant la commande ***${client.settings.prefix}ready***`);
};

module.exports.help = {
  name: 'checkin',
  aliases: ['checkin'],
  description: 'Lance le checkin du match',
  usage: '',
  options: {
    '--stop': 'Stop le chrono',
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
