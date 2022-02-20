module.exports.run = async (client, message, args) => {
  const matchId = args[0];
  const match = (await client.getMatch(matchId)) || [];
  if (match.length === 0) {
    return message.channel.send(`Ce match n'existe pas.`);
  }
  let meetingOfThisMatch = await match.getMeeting();
  const matches = await meetingOfThisMatch.getMatches();
  const channel = message.guild.channels.cache.get(meetingOfThisMatch.channelId);
  const teamsOfThisMeeting = await meetingOfThisMatch.getTeams();
  const winnerMention = message.mentions.roles.first();
  const score = args[2];

  if (match.maps_id === null) {
    return message.channel.send(
      `Vous devez définir une map à ce match pour pouvoir définir un résultat. Essayez la commande ***${client.settings.prefix}setmap***.`
    );
  }

  if (match.status === 'waiting') {
    return message.channel.send(
      `Ce match n'est pas défini comme étant commencé. En lui définissant une map, ce match sera défini comme étant commencé. Essayez la commande ***${client.settings.prefix}setmap***.`
    );
  }

  if (match.status === 'over') {
    return message.channel.send(`Ce match est déjà fini`);
  }

  if (!/\d\d-\d\d/.test(score)) {
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

  for (const match of matches) {
    if (parseInt(matchId.charAt(matchId.length - 1)) > parseInt(match.matchId.charAt(match.matchId.length - 1)) && match.status !== 'over') {
      return message.channel.send(
        `Vous ne pouvez pas donner de résultat à ce match car les résultats des autres matchs de cette rencontre n'ont pas été définis.`
      );
    }
    if (parseInt(matchId.charAt(matchId.length - 1)) === parseInt(match.matchId.charAt(match.matchId.length - 1))) {
      break;
    }
  }

  await client.updateMatch(matchId, 'status', 'over');
  await client.updateMatch(matchId, 'score', score);
  await client.updateMatch(matchId, 'winner', winnerMention.name);

  //Condition qui définie le gagnant du meeting.
  if (meetingOfThisMatch.BO === 1) {
    await client.updateMeeting(meetingOfThisMatch.meetingId, 'winner', winnerMention.name);
  } else if (meetingOfThisMatch.BO === 3 || meetingOfThisMatch.BO === 5) {
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

  //Création de la prochaine étape du tournois
  meetingOfThisMatch = await match.getMeeting();
  const meetingId = meetingOfThisMatch.meetingId;
  if (meetingId.charAt(0) !== '1') {
    //Si c'est le résultat de la finale, on ne va pas plus loin.

    if (meetingOfThisMatch.winnner !== null) {
      const lastCharOfMeeting = parseInt(meetingId.charAt(meetingId.length - 1));
      let secondMeeting;

      if (lastCharOfMeeting % 2 === 0) {
        //pair
        secondMeeting = await client.getMeeting(`${meetingId.substring(0, meetingId.length - 1)}${lastCharOfMeeting - 1}`);
      } else {
        //impair
        secondMeeting = await client.getMeeting(`${meetingId.substring(0, meetingId.length - 1)}${lastCharOfMeeting + 1}`);
      }

      if (secondMeeting.winner !== null) {
        const team1 = await client.getTeam('name', meetingOfThisMatch.winner);
        const team2 = await client.getTeam('name', secondMeeting.winner);

        if (meetingId.charAt(0) === '8') {
          await client.createMatch(message, team1, team2, 4);
        }
        if (meetingId.charAt(0) === '4') {
          await client.createMatch(message, team1, team2, 2);
        }
        if (meetingId.charAt(0) === '2') {
          await client.createMatch(message, team1, team2, 1);
        }
      }
    }
  }
};

module.exports.help = {
  name: 'result',
  aliases: ['result'],
  category: 'Organisateur',
  description: 'Défini le résultat du match en paramètre',
  usage: '<id_du_match> <@équipe gagnante> <score: exemple: 16-05>',
  canAdminMention: false,
  canUserMention: false,
  canRoleMention: true,
  isPermissionsRequired: true,
  isArgumentRequired: true,
  isUserMentionRequired: false,
  isRoleMentionRequired: true,
};
