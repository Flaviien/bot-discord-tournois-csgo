module.exports.run = async (client, message, args) => {
  const teamMention = message.mentions.roles.first();
  const membersMention = message.mentions.members;
  const team = await client.getTeam('name', teamMention.name);

  /* Test si l'équipe existe*/
  if (team === undefined || team === null) {
    return message.channel.send(`Cette équipe n'existe pas`);
  }

  membersMention.forEach(async (memberMention) => {
    await client.addMember(team.name, memberMention.id, memberMention.nickname !== null ? memberMention.nickname : memberMention.user.username);
  });
};

module.exports.help = {
  name: 'addplayer',
  aliases: ['addplayer', 'addp'],
  category: 'Organisateur',
  description: 'Ajoute un joueur à une équipe existante',
  usage: '<@role_de_l_equipe> <@joueur> <@joueur> ...',
  canAdminMention: false,
  canUserMention: true,
  canRoleMention: true,
  isPermissionsRequired: true,
  isArgumentRequired: true,
  isUserMentionRequired: true,
  isRoleMentionRequired: true,
};
