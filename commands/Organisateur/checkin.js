module.exports.run = async (client, message, args) => {
  const teams = await client.getTeams();
  const nbrTeams = await client.getNbrTeams();

  if (teams.length !== nbrTeams) {
    return message.channel.send(`Le nombre d'équipe pour lancer les checkins n'est pas suffisant: ${teams.length}/${nbrTeams}`);
  }

  const matches = await client.getMatches();
  const checkinTime = await client.getCheckinTime();

  for (const [i, arg] of args.entries()) {
    for (const [y, match] of matches.entries()) {
      if (match.matchId === arg) {
        await client.updateCheckinStatus(args[i], 1);

        setTimeout(async () => {
          const waitingMatches = await client.getMatchTeams(match.matchId);

          for (const waitingMatch of waitingMatches) {
            const team = await client.getTeam(null, waitingMatch.teams_id);
            if (waitingMatch.checkin === 1) {
              console.log(`L'équipe ${team.name} ne s'est pas présenté à temps !`);
            }
          }
        }, 60000 * checkinTime);
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
  adminMention: false,
  permissions: true,
  args: true,
  mention: false,
};
