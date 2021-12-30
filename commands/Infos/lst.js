const { MessageEmbed } = require('discord.js');

module.exports.run = async (client, message, args) => {
  if (args.length === 0) {
    const teams = await client.getTeams();

    const embed = new MessageEmbed()
      .setColor('#36393F')
      .setTitle('Voici la liste de toutes les équipes du tournoi:');

    for (const team of teams) {
      const members = await team.getMembers();
      let membersString = '';
      for (const [y, member] of members.entries()) {
        y === 0
          ? (membersString = `${member.name}`)
          : (membersString = `${membersString}, ${member.name}`);
      }
      embed.addField(`${team.name}`, `${membersString}`);
    }
    //console.log(embed);
    message.channel.send({ embeds: [embed] });
  }

  if (args.length <= 1) {
  }
};

module.exports.help = {
  name: 'lst',
  aliases: ['lst'],
  category: 'Infos',
  description:
    "Retourne la liste des équipes ou retourne les détails de l'équipe en paramètre",
  usage: '',
  adminMention: false,
  permissions: false,
  args: false,
  mention: false,
};
