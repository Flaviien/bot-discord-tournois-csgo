const { MessageEmbed } = require('discord.js');

module.exports.run = async (client, message, args) => {
  if (args.length === 0) {
    const matches = await client.getMatches('MatchId');

    const embed = new MessageEmbed()
      .setColor('#36393F')
      .setTitle('Voici la liste de tous les matchs du tournoi:');

    for (const match of matches) {
      const teams = await match.getTeams();
      embed.addField(
        `${match.matchId}`,
        `${teams[0].name} vs ${teams[1].name}`
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
  usage: '',
  adminMention: false,
  permissions: false,
  args: false,
  mention: false,
};
