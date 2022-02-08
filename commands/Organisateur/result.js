module.exports.run = async (client, message, args) => {
  const prefix = await client.getSetting('prefix');
  const matchId = args[0];
  const match = (await client.getMatch(matchId)) || [];
  if (match.length === 0) {
    return message.channel.send(`Ce match n'existe pas.`);
  }
  const meetingOfThisMatch = await match.getMeeting();
  const channel = message.guild.channels.cache.get(meetingOfThisMatch.channelId);
  const teamsOfThisMeeting = await meetingOfThisMatch.getTeams();
  const winnerMention = message.mentions.roles.first();
  const score = args[2];

  function useRegex(input) {
    let regex = /\d\d-\d\d/;
    return regex.test(input);
  }

  if (match.maps_id === null) {
    return message.channel.send(`Vous devez définir une map à ce match pour pouvoir définir un résultat. Essayez la commande ***${prefix}setmap***.`);
  }

  if (match.status === 'waiting') {
    return message.channel.send(
      `Ce match n'est pas défini comme étant commencé. En lui définissant une map, ce match sera défini comme étant commencé. Essayez la commande ***${prefix}setmap***.`
    );
  }

  if (match.status === 'over') {
    return message.channel.send(`Ce match est déjà fini`);
  }

  if (!useRegex(score)) {
    return message.channel.send('Le score doit être au format 00-00. Exemple: 16-05');
  }

  if (match.length === 0) {
    return message.channel.send(`Le match "${matchId}" n\'a pas été trouvé`);
  }

  if (winnerMention === null) {
    return message.channel.send(`L'équipe n'a pas été trouvé`);
  }

  const found = teamsOfThisMeeting.find((team) => team.name === winnerMention.name);

  if (found === undefined) {
    return message.channel.send(`L'équipe que vous avez mentionné ne participe pas à ce match`);
  }

  await client.updateMatch(matchId, 'status', 'over');
  await client.updateMatch(matchId, 'score', score);
  await client.updateMatch(matchId, 'winner', winnerMention.name);

  if (meetingOfThisMatch.BO === 1) {
    await client.updateMeeting(meetingOfThisMatch.meetingId, 'winner', winnerMention.name);
  } else if (meetingOfThisMatch.BO === 3 || meetingOfThisMatch.BO === 5) {
    const matches = await meetingOfThisMatch.getMatches();

    for (const teamOfThisMeeting of teamsOfThisMeeting) {
      const nbrOfWin = matches.filter((m) => m.winner === teamOfThisMeeting.name).length;
      if (meetingOfThisMatch.BO === 3) {
        if (nbrOfWin === 2) {
          await client.updateMeeting(meetingOfThisMatch.meetingId, 'winner', winnerMention.name);
          const matchesToDelete = matches.filter((m) => m.status === 'waiting');
          for (const matchToDelete of matchesToDelete) {
            await client.removeMatch(matchToDelete.matchId);
          }
        }
      } else if (meetingOfThisMatch.BO === 5) {
        if (nbrOfWin === 3) {
          await client.updateMeeting(meetingOfThisMatch.meetingId, 'winner', winnerMention.name);
        }
      }
    }
  }
  channel.send(
    `Le score de la **map n°${matchId.charAt(matchId.length - 1)}** du match **${teamsOfThisMeeting[0].name} vs ${
      teamsOfThisMeeting[1].name
    }** a été défini sur **${score}**. Le gagnant est **${winnerMention.name}**`
  );
};

module.exports.help = {
  name: 'result',
  aliases: ['result'],
  category: 'Organisateur',
  description: 'Défini le résultat du match en paramètre',
  usage: '<id_du_match> <@équipe gagnante> <score: exemple: 16-05>',
  canAdminMention: false,
  isPermissionsRequired: true,
  isArgumentRequired: true,
  needUserMention: false,
  needRoleMention: true,
};
