module.exports.run = async (client, message, args) => {
  /*
  Verification du nombre d'équipes présentes.
  Update le statut du checkin, pour chaque matchs en argument, dans la DB.
  Lance un timer (15min par défaut), qui vérifie si les équipes ce sont présentées.
  */
  const teams = await client.getTeams();
  const nbrTeams = await client.getSetting('nbr_teams');

  if (teams.length !== nbrTeams) {
    return message.channel.send(`Le nombre d'équipe pour lancer les checkins n'est pas suffisant: ${teams.length}/${nbrTeams}`);
  }

  const matches = await client.getMatches();

  for (const [i, arg] of args.entries()) {
    for (const [y, match] of matches.entries()) {
      if (match.matchId === arg) {
        const meetingOfThisMatch = await match.getMeeting();
        const teamsOfThisMeeting = await meetingOfThisMatch.getTeams();

        for (const teamOfThisMeeting of teamsOfThisMeeting) {
          client.matches.set(teamOfThisMeeting.name, { matchId: match.matchId, checkin: 1 });
          console.log(client.matches);
          setTimeout(async () => {
            if (client.matches.get(teamOfThisMeeting.name).checkin === 1) {
              client.matches.delete(teamOfThisMeeting.name);

              const channel = message.guild.channels.cache.get(meetingOfThisMatch.channelId);
              channel.send(`L'équipe ${teamOfThisMeeting.name} ne s'est pas présentée à temps !`);
              console.log(`L'équipe ${teamOfThisMeeting.name} ne s'est pas présentée à temps !`);
            }
            /* if (client.matches.get(teamOfThisMeeting.name).checkin === 2) {
              client.matches.delete(teamOfThisMeeting.name);
              console.log(`L'équipe ${teamOfThisMeeting.name} s'est bien présentée.`);
            } */
          }, 5000 /* 60000 * checkinTime */);
        }

        break;
      }

      if (y === matches.length - 1) {
        message.channel.send(`Le match ${arg} n'a pas été trouvé. Le checkin n'a PAS été lancé pour ce match !`);
      }
    }
  }
};

module.exports.help = {
  name: 'checkin',
  aliases: ['checkin'],
  category: 'Oragnisateur',
  description: 'Lance le checkin pour les matchs en paramètres',
  usage: '<id_du_match> <id_du_match>...',
  canAdminMention: false,
  isPermissionsRequired: true,
  isArgumentRequired: true,
  needUserMention: false,
  needRoleMention: false,
};
