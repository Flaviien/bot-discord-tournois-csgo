const { MessageEmbed } = require('discord.js');

module.exports.run = async (client, message, args) => {
  const teamsMentions = message.mentions.roles;

  if (teamsMentions.size != 2) {
    return message.channel.send(`Vous devez mentionner deux équipes`);
  }

  const teams = [await client.getTeam('roleId', teamsMentions.at(0)?.id), await client.getTeam('roleId', teamsMentions.at(1)?.id)];

  for (const [i, team] of teams.entries()) {
    if (team === null) {
      return message.channel.send(`L'équipe ${teamsMentions.at(i).name} n'est pas inscrite au tournoi`);
    }
  }

  const mentionnedTeamsMeetings = [await teams[0].getMeetings(), await teams[1].getMeetings()];

  for (const [i, meeting] of mentionnedTeamsMeetings.entries()) {
    if (meeting.length > 0) {
      return message.channel.send(`L'équipe ${teams[i].name} a déjà son match de programmé.`);
    }
  }

  if (teams.length !== 2) {
    return message.channel.send(`Une erreur est survenue`);
  }

  if (teams.length === 2) {
    const commands = client.commands.filter((cat) => cat.help.isPermissionsRequired === false);
    const prefix = await client.getSetting('prefix');
    const channel = await message.guild.channels.create(`8eme-${teams[0].name} vs ${teams[1].name}`);
    const embed = new MessageEmbed().setColor('#36393F').setTitle('Voici la liste des commandes qui vous sont accessibles pour ce tournoi:');

    commands.forEach((command) => {
      embed.addField(`${prefix}${command.help.aliases.join(`, ${prefix}`)}`, `${command.help.description}`);
    });

    //Ajout des rencontres
    const meetings = (await client.getMeetings()) || [];
    const meeting = await client.addMeeting(`8e${meetings.length + 1}`, channel.id, teams[0].id, teams[1].id);

    channel.send({ embeds: [embed] });

    //Ajout des matchs
    for (let i = 1; i <= meeting.BO; i++) {
      await client.addMatch(`${meeting.meetingId}.${i}`, meeting.meetingId);
    }
  }
};

module.exports.help = {
  name: 'creatematch',
  aliases: ['creatematch', 'cm'],
  category: 'Organisateur',
  description: "Pour créer les matchs de l'arbre initial manuellement",
  usage: '<@équipe 1> <@équipe 2>',
  canAdminMention: false,
  isPermissionsRequired: true,
  isArgumentRequired: true,
  needUserMention: false,
  needRoleMention: true,
};
