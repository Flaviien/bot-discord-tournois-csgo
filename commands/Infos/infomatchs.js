const { MessageEmbed } = require('discord.js');

module.exports.run = async (client, message, args) => {
  const matchDetails = async (matches) => {
    let matchList = ``;
    for (let i = 0; i < matches.length; i++) {
      const mapNumber = matches[i].subId;

      if (matches[i].status === 'waiting') {
        matchList += `${i > 0 ? '\n' : ''}Map ${mapNumber} - Match en attente`;
        break;
      }
      if (matches[i].status === 'playing') {
        const maps = await matches[i].getMap();
        matchList += `${i > 0 ? '\n' : ''}Map ${mapNumber} : **${maps.name}** - Match en cours`;
      }
      if (matches[i].status === 'canceled') {
        const maps = await matches[i].getMap();
        matchList += `${i > 0 ? '\n' : ''}Map ${mapNumber} : **${maps.name}**`;
      }
      if (matches[i].status === 'over') {
        const maps = await matches[i].getMap();
        matchList += `${i > 0 ? '\n' : ''}Map ${mapNumber} : **${maps.name}** - Score : **${matches[i].score}** - Gagnant : **${matches[i].winner}**`;
      }
    }
    return matchList;
  };
  const meetings = await client.getMeetings();
  const nbrTeams = await client.getSetting('nbr_teams');

  if (meetings.length < nbrTeams / 2) {
    return message.channel.send("Les matchs n'ont pas encore été programmés");
  }

  const embed = new MessageEmbed().setColor('#0000f6').setTitle('Voici la liste de tous les matchs du tournoi:');

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

  /* if (args.length === 1) {
    //L'affichage d'un seul match fonctionne avant l'ancien systeme d'id. Pour le remettre à jour, il faudrais plutôt partir sur une double mention.
    //Peu pratique.
    try {
      const meeting = await client.getMeeting(args[0]);
      const teams = await meeting.getTeams();
      const embed = new MessageEmbed().setColor('#0000f6').setTitle(`${teams[0].name} vs ${teams[1].name}  - BO${meeting.BO}`);
      const matches = await meeting.getMatches();

      embed.setDescription(await matchDetails(matches));
      message.channel.send({ embeds: [embed] });
    } catch (error) {
      console.error(error);
    }
  } */
};

module.exports.help = {
  name: 'infomatchs',
  aliases: ['infomatchs', 'im'],
  description: 'Affiche la liste des rencontres',
  cooldown: 30,
  usage: '',
  canAdminMention: false,
  canUserMention: false,
  canRoleMention: false,
  isPermissionsRequired: false,
  isArgumentRequired: false,
  isUserMentionRequired: false,
  isRoleMentionRequired: false,
};
