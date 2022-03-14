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
    await client.createMatch(message, teams[0], teams[1], client.settings.nbrTeams / 2);
  }
};

module.exports.help = {
  name: 'seed',
  aliases: ['seed'],
  description: "Pour créer les matchs de l'arbre initial manuellement",
  usage: '<@équipe 1> <@équipe 2>',
  canAdminMention: false,
  canUserMention: false,
  canRoleMention: true,
  isPermissionsRequired: true,
  isArgumentRequired: false,
  isUserMentionRequired: false,
  isRoleMentionRequired: true,
};
