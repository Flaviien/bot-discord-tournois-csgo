const { MessageEmbed } = require('discord.js');

module.exports.run = async (client, message, args) => {
  const prefix = await client.getSetting('prefix');
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
      const meetings = (await client.getMeetings()) || [];
      const team1 = await client.getTeam('name', meetingOfThisMatch.winner);
      const team2 = await client.getTeam('name', secondMeeting.winner);
      const commands = client.commands.filter((cat) => cat.help.isPermissionsRequired === false);
      const prefix = await client.getSetting('prefix');
      let channel;
      const embed = new MessageEmbed().setColor('#36393F').setTitle('Voici la liste des commandes qui vous sont accessibles pour ce tournoi:');
      commands.forEach((command) => {
        embed.addField(`${prefix}${command.help.aliases.join(`, ${prefix}`)}`, `${command.help.description}`);
      });

      if (meetingId.charAt(0) === '8') {
        const numberOfMeetingOfThisStage = meetings.filter((m) => m.meetingId.charAt(0) === '4').length;
        channel = await message.guild.channels.create(`Quart-${team1.name} vs ${team2.name}`, { parent: client.config.CATEGORIES_CHANNELS_ID.stage4 });
        const meeting = await client.addMeeting(`4e${numberOfMeetingOfThisStage + 1}`, channel.id, team1.id, team2.id);
        //Ajout des matchs
        for (let i = 1; i <= meeting.BO; i++) {
          await client.addMatch(`${meeting.meetingId}.${i}`, meeting.meetingId);
        }
      }
      if (meetingId.charAt(0) === '4') {
        const numberOfMeetingOfThisStage = meetings.filter((m) => m.meetingId.charAt(0) === '2').length;
        channel = await message.guild.channels.create(`Demi-finale-${team1.name} vs ${team2.name}`, { parent: client.config.CATEGORIES_CHANNELS_ID.stage2 });
        const meeting = await client.addMeeting(`2e${numberOfMeetingOfThisStage + 1}`, channel.id, team1.id, team2.id);
        //Ajout des matchs
        for (let i = 1; i <= meeting.BO; i++) {
          await client.addMatch(`${meeting.meetingId}.${i}`, meeting.meetingId);
        }
      }
      if (meetingId.charAt(0) === '2') {
        channel = await message.guild.channels.create(`Finale-${team1.name} vs ${team2.name}`, { parent: client.config.CATEGORIES_CHANNELS_ID.stage1 });
        const meeting = await client.addMeeting(`1e1`, channel.id, team1.id, team2.id);
        //Ajout des matchs
        for (let i = 1; i <= meeting.BO; i++) {
          await client.addMatch(`${meeting.meetingId}.${i}`, meeting.meetingId);
        }
      }

      channel.send({ embeds: [embed] });
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
  isPermissionsRequired: true,
  isArgumentRequired: true,
  needUserMention: false,
  needRoleMention: true,
};
