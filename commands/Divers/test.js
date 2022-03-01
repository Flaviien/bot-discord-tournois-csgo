module.exports.run = async (client, message, args) => {
  const teamMention = message.mentions.roles.first();
  const team = await client.getTeams(teamMention.id);
  const mapName = args[0];
  console.log(mapName);
};

module.exports.help = {
  name: 'test',
  aliases: ['test'],
  description: 'Help for development',
  usage: '',
  canAdminMention: false,
  canUserMention: true,
  canRoleMention: true,
  isPermissionsRequired: false,
  isArgumentRequired: false,
  isUserMentionRequired: false,
  isRoleMentionRequired: false,
};
