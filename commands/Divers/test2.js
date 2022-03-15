module.exports.run = async (client, message, args) => {
  client.meetings.delete('Blink');
  console.log(client.meetings);
};

module.exports.help = {
  name: 'test2',
  aliases: ['test2'],
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
