module.exports.run = async (client, message, args) => {
  console.log(client);
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
