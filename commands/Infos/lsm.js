const { MessageEmbed } = require('discord.js');

module.exports.run = async (client, message, args) => {
  if (args.length === 0) {
    const meetings = await client.getMeetings();

    const embed = new MessageEmbed()
      .setColor('#36393F')
      .setTitle('Voici la liste de tous les matchs du tournoi:');

    for (const meeting of meetings) {
      const teams = await meeting.getTeams();

      const matchDetails = () => {
        let matchList = ``;
        for (let i = 0; i < meeting.BO; i++) {
          console.log(meeting.BO);
          matchList += `${i > 0 ? '\n' : ''}TODO`;
        }
        return matchList;
      };

      embed.addField(
        `${teams[0].name} vs ${teams[1].name} ${
          meeting.BO > 1 ? ` - BO${meeting.BO}` : ''
        } `,
        matchDetails()
      );
    }
    message.channel.send({ embeds: [embed] });
  }

  if (args.length <= 1) {
  }
};

module.exports.help = {
  name: 'lsm',
  aliases: ['lsm'],
  category: 'Infos',
  description:
    'Retourne la liste des matchs ou retourne les détails du match en paramètre',
  cooldown: 2,
  usage: '',
  adminMention: false,
  permissions: false,
  args: false,
  mention: false,
};
