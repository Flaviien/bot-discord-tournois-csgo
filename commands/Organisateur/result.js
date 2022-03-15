module.exports.run = async (client, message, args) => {
  const teamMention = message.mentions.roles.first();
  if (teamMention == null) {
    return message.channel.send(`Ce rôle n'existe pas`);
  }

  const team = await client.getTeam('name', teamMention.name);
  if (team == null) {
    return message.channel.send(`L'équipe n'a pas été trouvée`);
  }

  const meeting = await client.getMeetingByChannelId(message.channel.id);
  if (meeting == null) {
    return message.channel.send(`Cette commande fonctionne uniquement dans les channels des rencontres`);
  }

  const teams = await meeting.getTeams();
  if (teams == null) {
    return message.channel.send(`Les équipes n'ont pas été trouvées`);
  }
  if (teams.length !== 2) {
    return message.channel.send(client.config.ERROR_MESSAGE);
  }

  const found = teams.find((t) => t.roleId === team.roleId);
  if (found == null) {
    return message.channel.send(`L'équipe mentionnée ne fait pas partie de cette rencontre.`);
  }

  //Récupération du match concerné. La verif du subId pour vérifier si on récupere le bon match dans le cas d'un BO3 ou BO5
  let matchsOfThisMeeting = await meeting.getMatches();
  let subId = client.settings[`BO_stage${meeting.stage}`]; //subId = 1 ou 3 ou 5

  matchsOfThisMeeting.forEach((m) => {
    if (m.winner === null && m.subId < subId) {
      subId = m.subId;
    }
  });

  const matchOfThisMeeting = matchsOfThisMeeting.find((m) => m.subId === subId);

  if (matchOfThisMeeting == undefined) {
    return message.channel.send(`Cette équipe n'a pas de match en cours`);
  }

  if (matchOfThisMeeting.status === 'waiting') {
    return message.channel.send(
      `Avant de pouvoir définir un résultat à un match, vous devez le définir comme étant commencé. Essayez la commande ***${client.settings.prefix}start <numéro_du_match>***.`
    );
  }

  if (matchOfThisMeeting.status === 'over') {
    return message.channel.send(`Ce match est déjà fini`);
  }

  const score = args[0];
  if (!/\d\d-\d\d/.test(score)) {
    return message.channel.send('Le score doit être au format 00-00. Exemple: 16-05');
  }

  await Promise.all([
    await client.updateMatch(matchOfThisMeeting.id, 'status', 'over'),
    await client.updateMatch(matchOfThisMeeting.id, 'score', score),
    await client.updateMatch(matchOfThisMeeting.id, 'winner', team.name),
  ]);

  matchsOfThisMeeting = await meeting.getMatches(); //On refait getMatches pour actualiser avec les nouvelles valeurs

  //Condition qui définie le gagnant du meeting.
  if (meeting.BO === 1) {
    await client.updateMeeting(meeting.id, 'winner', teamMention.name);
  } else if (meeting.BO === 3 || meeting.BO === 5) {
    for (const team of teams) {
      const nbrOfWin = matchsOfThisMeeting.filter((m) => m.winner === team.name).length;
      if (meeting.BO === 3) {
        if (nbrOfWin === 2) {
          await client.updateMeeting(meeting.id, 'winner', teamMention.name);
          const matchToCanceled = matchsOfThisMeeting.find((m) => m.status === 'waiting');
          if (matchToCanceled != undefined) await client.updateMatch(matchToCanceled.id, 'status', 'canceled');
        }
      } else if (meeting.BO === 5) {
        if (nbrOfWin === 3) {
          await client.updateMeeting(meeting.id, 'winner', teamMention.name);
          const matchesToCanceled = matchsOfThisMeeting.filter((m) => m.status === 'waiting');
          for (const matchToCanceled of matchesToCanceled) {
            if (matchToCanceled != undefined) await client.updateMatch(matchToCanceled.id, 'status', 'canceled');
          }
        }
      }
    }
  }

  message.channel.send(
    `Le score de la **map n°${matchOfThisMeeting.subId}** du match **${teams[0].name} vs ${teams[1].name}** a été défini sur **${score}**. Le gagnant est **${teamMention.name}**`
  );

  //Création de la prochaine étape du tournois
  const meetingOfThisMatch = await matchOfThisMeeting.getMeeting(); //On refait getMeeting pour l'actualiser avec le vainqueur

  if (meetingOfThisMatch.stage === 1) {
    //Si c'est le résultat de la finale, on ne va pas plus loin.
    return;
  }
  if (meetingOfThisMatch.winner !== null) {
    let secondMeeting;

    if (meetingOfThisMatch.subStage % 2 === 0) {
      //pair
      secondMeeting = await client.getMeetingByStageAndSubStage(meetingOfThisMatch.stage, meetingOfThisMatch.subStage - 1);
    } else {
      //impair
      secondMeeting = await client.getMeetingByStageAndSubStage(meetingOfThisMatch.stage, meetingOfThisMatch.subStage + 1);
    }

    if (secondMeeting.winner !== null) {
      const team1 = await client.getTeam('name', meetingOfThisMatch.winner);
      const team2 = await client.getTeam('name', secondMeeting.winner);

      if (meetingOfThisMatch.stage === 8) {
        await client.createMatch(message, team1, team2, 4);
      }
      if (meetingOfThisMatch.stage === 4) {
        await client.createMatch(message, team1, team2, 2);
      }
      if (meetingOfThisMatch.stage === 2) {
        await client.createMatch(message, team1, team2, 1);
      }
    }
  }
};

module.exports.help = {
  name: 'result',
  aliases: ['result'],
  description: 'Défini le résultat du match en paramètre',
  usage: '<@équipe gagnante> <score: exemple: 16-05>',
  canAdminMention: false,
  canUserMention: false,
  canRoleMention: true,
  isPermissionsRequired: true,
  isArgumentRequired: true,
  isUserMentionRequired: false,
  isRoleMentionRequired: true,
};
