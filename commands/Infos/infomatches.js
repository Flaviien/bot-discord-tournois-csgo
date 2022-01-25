const { MessageEmbed } = require('discord.js');

module.exports.run = async (client, message, args) => {
  if (args.length === 0) {
    const meetings = await client.getMeetings();
    const embed = new MessageEmbed().setColor('#36393F').setTitle('Voici la liste de tous les matchs du tournoi:');

    const matchDetails = async (meeting, matches) => {
      let matchList = ``;
      for (let i = 0; i < meeting.BO; i++) {
        const matchId = matches[i].matchId;
        const mapNumber = matchId.charAt(matchId.length - 1);
        console.log(matches[i].status);

        if (matches[i].status === 'waiting') {
          matchList += `${i > 0 ? '\n' : ''} Map ${mapNumber} - Match en attente`;
          break;
        }
        if (matches[i].status === 'playing') {
          const maps = await matches[i].getMap();
          matchList += `${i > 0 ? '\n' : ''}  Map ${mapNumber} : **${maps.name}** - Match en cours`;
        }
        if (matches[i].status === 'over') {
          const maps = await matches[i].getMap();
          matchList += `${i > 0 ? '\n' : ''} Map ${mapNumber} : **${maps.name}** - Score : **${matches[i].score}** - Gagnant : **${matches[i].winner}**`;
        }
      }
      return matchList;
    };

    for (const meeting of meetings) {
      try {
        const teams = await meeting.getTeams();
        const matches = await meeting.getMatches();

        embed.addField(`${teams[0].name} vs ${teams[1].name}  - BO${meeting.BO}`, await matchDetails(meeting, matches));
      } catch (error) {
        console.log(error);
      }
    }
    message.channel.send({ embeds: [embed] });
  }

  if (args.length <= 1) {
  }
};

module.exports.help = {
  name: 'infomatches',
  aliases: ['infomatches', 'im'],
  category: 'Infos',
  description: 'Retourne la liste des matchs ou retourne les détails du match en paramètre',
  cooldown: 5,
  usage: '',
  canAdminMention: false,
  isPermissionsRequired: false,
  isArgumentRequired: false,
  needUserMention: false,
  needRoleMention: false,
};
