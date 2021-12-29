module.exports.run = async (client, message, args) => {
  const teamName = args[0];

  const team = await client.getTeam(teamName);
  console.log(team.name.toLowerCase() == 'vscode');
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
