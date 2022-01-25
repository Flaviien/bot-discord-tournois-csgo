const { MessageEmbed } = require('discord.js');

module.exports.run = async (client, message, args) => {
  if (args.length === 0) {
    const teams = (await client.getTeams()) || [];
    if (teams.length > 0) {
      const embed = new MessageEmbed().setColor('#36393F').setTitle('Voici la liste de toutes les équipes du tournoi:');

      for (const team of teams) {
        const members = await team.getMembers();
        let membersString = '';
        for (const [y, member] of members.entries()) {
          y === 0 ? (membersString = `${member.name}`) : (membersString = `${membersString}, ${member.name}`);
        }
        embed.addField(`${team.name}`, `${membersString}`);
      }
      message.channel.send({ embeds: [embed] });
    }

    if (teams.length === 0) {
      message.channel.send(`Aucune équipe n'est actuellement enregistrée`);
    }
  }

  if (args.length <= 1) {
  }
};

module.exports.help = {
  name: 'infoteams',
  aliases: ['infoteams', 'it'],
  category: 'Infos',
  description: "Retourne la liste des équipes ou retourne les détails de l'équipe en paramètre",
  cooldown: 30,
  usage: '',
  canAdminMention: false,
  isPermissionsRequired: false,
  isArgumentRequired: false,
  needUserMention: false,
  needRoleMention: false,
};
