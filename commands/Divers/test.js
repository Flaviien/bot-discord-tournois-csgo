module.exports.run = async (client, message, args) => {
  console.log(client.meetings);
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
