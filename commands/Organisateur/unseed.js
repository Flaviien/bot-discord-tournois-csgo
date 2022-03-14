module.exports.run = async (client, message, args) => {
  const teamMention = message.mentions.roles.first();

  const team = await client.getTeam('roleId', teamMention.id);

  if (team == null) {
    return message.channel.send(`L'équipe ${teamMention.name} n'est pas inscrite au tournoi`);
  }

  const meetingsOfThisTeam = await team.getMeetings();
  const meeting = meetingsOfThisTeam[0]; //C

  if (meeting == null) {
    return message.channel.send(`L'équipe ${teamMention.name} n'a pas de match en cours`);
  }

  const matches = await meeting.getMatches();

  if (matches == null) {
    return message.channel.send(`L'équipe ${teamMention.name} n'a pas de match en cours`);
  }

  for (const match of matches) {
    if (match.winner != null || match.status !== 'waiting') {
      return message.channel.send(
        `Le match a déjà été joué ou est encore en cours. Essayez plutôt la commande ***${client.settings.prefix}ff <@nom_de_l_equipe>***`
      );
    }
  }

  const channels = await message.guild.channels.fetch();
  const channel = channels.get(meeting.channelId);

  if (channel == null) {
    return message.channel.send(`Une erreur est survenue`);
  } else {
    channel.delete();
    await client.removeMeeting(meeting.id);
  }
};

module.exports.help = {
  name: 'unseed',
  aliases: ['unseed', 'us'],
  description: "Pour supprimer les matchs de l'arbre initial manuellement",
  usage: '<@équipe> (Une des deux équipes suffit pour supprimer la rencontre)',
  canAdminMention: false,
  canUserMention: false,
  canRoleMention: true,
  isPermissionsRequired: true,
  isArgumentRequired: false,
  isUserMentionRequired: false,
  isRoleMentionRequired: true,
};
