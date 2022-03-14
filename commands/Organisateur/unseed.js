module.exports.run = async (client, message, args) => {
  const meeting = await client.getMeetingByChannelId(message.channel.id);

  if (meeting == null) {
    return message.channel.send(`Cette commande fonctionne uniquement dans les channels des rencontres`);
  }

  const matches = await meeting.getMatches();

  if (matches == null) {
    return message.channel.send(client.config.ERROR_MESSAGE);
  }

  for (const match of matches) {
    if (match.winner != null || match.status !== 'waiting') {
      return message.channel.send(
        `Le match a déjà été joué ou est encore en cours. Essayez plutôt la commande ***${client.settings.prefix}ff <@nom_de_l_equipe>***`
      );
    }
  }

  message.channel.delete();
  await client.removeMeeting(meeting.id);
};

module.exports.help = {
  name: 'unseed',
  aliases: ['unseed', 'us'],
  description: "Pour supprimer les matchs de l'arbre initial manuellement",
  usage: '',
  canAdminMention: false,
  canUserMention: false,
  canRoleMention: false,
  isPermissionsRequired: true,
  isArgumentRequired: false,
  isUserMentionRequired: false,
  isRoleMentionRequired: false,
};
