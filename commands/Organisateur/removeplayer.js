module.exports.run = async (client, message, args) => {
  const membersMention = message.mentions.members;

  membersMention.forEach(async (memberMention) => {
    await client.removeMember(memberMention.id);
  });
};

module.exports.help = {
  name: 'removeplayer',
  aliases: ['removeplayer', 'remp'],
  category: 'Organisateur',
  description: "Retire un joueur d'une une équipe existante",
  usage: '<@joueur> <@joueur> ...',
  canAdminMention: false,
  isPermissionsRequired: true,
  isArgumentRequired: true,
  needUserMention: true,
  needRoleMention: false,
};
