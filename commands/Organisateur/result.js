module.exports.run = async (client, message, args) => {
  const teamMention = message.mentions.roles.first();
  const score = args[0];

  if (teamMention == null) {
    return message.channel.send(`L'équipe n'a pas été trouvé`);
  }

  const team = await client.getTeam('name', teamMention.name);

  if (team == null) {
    return message.channel.send(`L'équipe n'a pas été trouvé`);
  }

  //Récupération du meeting concerné
  const meetingsOfThisTeam = await team.getMeetings();
  const meetingOfThisTeam = meetingsOfThisTeam.find((m) => m.winner === null);

  if (meetingOfThisTeam == undefined) {
    return message.channel.send(`Cette équipe n'a pas de match en cours`);
  }
  const channel = message.guild.channels.cache.get(meetingOfThisTeam.channelId);
  const teams = await meetingOfThisTeam.getTeams();

  if (message.channel.id !== meetingOfThisTeam.channelId) {
    return;
  }

  //Récupération du match concerné. La verif du subId pour vérifier si on récupere le bon match dans le cas d'un BO3 ou BO5
  let matchsOfThisMeeting = await meetingOfThisTeam.getMatches();
  let subId = client.settings[`BO_stage${meetingOfThisTeam.stage}`]; //subId = 1 ou 3 ou 5

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

  if (!/\d\d-\d\d/.test(score)) {
    return message.channel.send('Le score doit être au format 00-00. Exemple: 16-05');
  }

  await Promise.all([
    await client.updateMatch(matchOfThisMeeting.id, 'status', 'over'),
    await client.updateMatch(matchOfThisMeeting.id, 'score', score),
    await client.updateMatch(matchOfThisMeeting.id, 'winner', team.name),
  ]);

  matchsOfThisMeeting = await meetingOfThisTeam.getMatches(); //On refait getMatches pour actualiser avec les nouvelles valeurs

  //Condition qui définie le gagnant du meeting.
  if (meetingOfThisTeam.BO === 1) {
    await client.updateMeeting(meetingOfThisTeam.id, 'winner', teamMention.name);
  } else if (meetingOfThisTeam.BO === 3 || meetingOfThisTeam.BO === 5) {
    for (const team of teams) {
      const nbrOfWin = matchsOfThisMeeting.filter((m) => m.winner === team.name).length;
      if (meetingOfThisTeam.BO === 3) {
        if (nbrOfWin === 2) {
          await client.updateMeeting(meetingOfThisTeam.id, 'winner', teamMention.name);
          const matchToCanceled = matchsOfThisMeeting.find((m) => m.status === 'waiting');
          if (matchToCanceled != undefined) await client.updateMatch(matchToCanceled.id, 'status', 'canceled');
        }
      } else if (meetingOfThisTeam.BO === 5) {
        if (nbrOfWin === 3) {
          await client.updateMeeting(meetingOfThisTeam.id, 'winner', teamMention.name);
          const matchesToCanceled = matchsOfThisMeeting.filter((m) => m.status === 'waiting');
          for (const matchToCanceled of matchesToCanceled) {
            if (matchToCanceled != undefined) await client.updateMatch(matchToCanceled.id, 'status', 'canceled');
          }
        }
      }
    }
  }

  channel.send(
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
  isArgumentRequired: false, //need true; false for dev
  isUserMentionRequired: false,
  isRoleMentionRequired: true,
};
