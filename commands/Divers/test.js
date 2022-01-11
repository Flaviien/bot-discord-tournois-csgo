module.exports.run = async (client, message, args) => {
  console.log('test');
};

module.exports.help = {
  name: 'test',
  aliases: ['test'],
  category: 'Divers',
  description: 'Help for development',
  usage: '',
  options: {},
  canAdminMention: true,
  isPermissionsRequired: false,
  isArgumentRequired: false,
  needUserMention: false,
  needRoleMention: true,
};
