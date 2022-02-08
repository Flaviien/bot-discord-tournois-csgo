module.exports.run = async (client, message, args) => {
  await client.updateMeeting('8e1', 'winner', 'BIG');
};

module.exports.help = {
  name: 'test',
  aliases: ['test'],
  category: 'Divers',
  description: 'Help for development',
  usage: '',
  canAdminMention: true,
  isPermissionsRequired: true,
  isArgumentRequired: false,
  needUserMention: false,
  needRoleMention: false,
};
