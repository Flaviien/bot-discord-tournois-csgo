const { MessageEmbed } = require('discord.js');

module.exports.run = async (client, message, args) => {
  const teamMention = message.mentions.roles;
  if (teamMention.size === 0) {
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
      return message.channel.send({ embeds: [embed] });
    }

    if (teams.length === 0) {
      return message.channel.send(`Aucune équipe n'est actuellement enregistrée`);
    }
  }

  if (teamMention.size === 1) {
    const team = await client.getTeam('roleId', teamMention.firstKey());
    if (team != null) {
      const embed = new MessageEmbed().setColor('#36393F').setTitle(`${team.name}`);
      const members = await team.getMembers();
      let membersString = '';
      for (const [y, member] of members.entries()) {
        membersString = `${membersString}${member.name}\n`;
      }
      embed.setDescription(`${membersString}`);
      return message.channel.send({ embeds: [embed] });
    } else {
      return message.channel.send(`Ce rôle ne participe pas au tournoi`);
    }
  }
  if (teamMention.size >= 1) {
    return message.channel.send(`Veuillez mentionner une seule équipe.`);
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
  canUserMention: false,
  canRoleMention: true,
  isPermissionsRequired: false,
  isArgumentRequired: false,
  isUserMentionRequired: false,
  isRoleMentionRequired: false,
};
