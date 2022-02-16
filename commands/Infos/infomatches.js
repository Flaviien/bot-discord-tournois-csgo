const { MessageEmbed } = require('discord.js');

module.exports.run = async (client, message, args, options) => {
  const adminVue = options.find((x) => x.toLowerCase() === '--admin');

  const matchDetails = async (matches) => {
    let matchList = ``;
    for (let i = 0; i < matches.length; i++) {
      const matchId = matches[i].matchId;
      const mapNumber = matchId.charAt(matchId.length - 1);

      if (matches[i].status === 'waiting') {
        matchList += `${i > 0 ? '\n' : ''}${adminVue != undefined ? matchId + ' -' : ''} Map ${mapNumber} - Match en attente`;
        break;
      }
      if (matches[i].status === 'playing') {
        const maps = await matches[i].getMap();
        matchList += `${i > 0 ? '\n' : ''}${adminVue != undefined ? matchId + ' -' : ''}  Map ${mapNumber} : **${maps.name}** - Match en cours`;
      }
      if (matches[i].status === 'over') {
        const maps = await matches[i].getMap();
        matchList += `${i > 0 ? '\n' : ''}${adminVue != undefined ? matchId + ' -' : ''}  Map ${mapNumber} : **${maps.name}** - Score : **${
          matches[i].score
        }** - Gagnant : **${matches[i].winner}**`;
      }
    }
    return matchList;
  };
  const meetings = await client.getMeetings();
  const nbrTeams = await client.getSetting('nbr_teams');

  if (meetings.length < nbrTeams / 2) {
    return message.channel.send("Les matchs n'ont pas encore été programmés");
  }

  if (args.length === 0) {
    const embed = new MessageEmbed().setColor('#36393F').setTitle('Voici la liste de tous les matchs du tournoi:');

    for (const meeting of meetings) {
      try {
        const teams = await meeting.getTeams();
        const matches = await meeting.getMatches();

        embed.addField(`${teams[0].name} vs ${teams[1].name}  - BO${meeting.BO}`, await matchDetails(matches));
      } catch (error) {
        console.error(error);
      }
    }
    message.channel.send({ embeds: [embed] });
  }

  if (args.length === 1) {
    try {
      const meeting = await client.getMeeting(args[0]);
      const teams = await meeting.getTeams();
      const embed = new MessageEmbed().setColor('#36393F').setTitle(`${teams[0].name} vs ${teams[1].name}  - BO${meeting.BO}`);
      const matches = await meeting.getMatches();

      embed.setDescription(await matchDetails(matches));
      message.channel.send({ embeds: [embed] });
    } catch (error) {
      console.error(error);
    }
  }

  if (args.length > 1) {
    message.channel.send(`Veuillez n'indiquer qu'un seul match ou une seule rencontre`);
  }
};

module.exports.help = {
  name: 'infomatches',
  aliases: ['infomatches', 'im'],
  category: 'Infos',
  description: 'Retourne la liste des rencontres ou retourne les détails de la rencontre en paramètre',
  cooldown: 30,
  usage: '',
  options: {
    '--admin': 'Affiche les identifiants des rencontre',
  },
  canAdminMention: false,
  isPermissionsRequired: false,
  isArgumentRequired: false,
  needUserMention: false,
  needRoleMention: false,
};
