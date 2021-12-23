module.exports.run = async (client, message, args) => {
  const teamMention = args[0];
  const teamRoleId = await client.removeTeam(teamMention);

  const role = await message.guild.roles.fetch(teamRoleId);
  role.members.forEach(async (member) => {
    await member.roles.remove(role);
  });

  await role.delete();
};

module.exports.help = {
  name: 'unsub',
  aliases: ['unsub'],
  category: 'Organisateur',
  description: 'Désincrit une équipe et ses membres du tournois',
  usage: '<@nom_de_l_equipe>',
  adminMention: false,
  permissions: false,
  args: false,
  mention: false,
};
