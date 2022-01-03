module.exports.run = async (client, message, args) => {
  console.log(client.matches);
};

module.exports.help = {
  name: 'test',
  aliases: ['test'],
  category: 'Divers',
  description: 'Test pour le developement',
  usage: '',
  adminMention: false,
  permissions: false,
  args: false,
  mention: false,
};
