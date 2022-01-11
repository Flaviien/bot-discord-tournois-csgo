module.exports.run = async (client, message, args) => {
  const channels = await message.guild.channels.fetch();
  channels.forEach((channel) => {
    if (channel.id !== '807215053845692466') {
      channel.delete(channel.id);
    }
  });

  const roles = await message.guild.roles.fetch();
  roles.forEach((role) => {
    if (role.id !== '806577116568223826' && role.id !== '922489307401445427' && role.id !== '804809031763492924') {
      //ni fondateur | ni bot | ni everyone
      role.delete(role.id);
    }
  });
};

module.exports.help = {
  name: 'deleteAllChannelsAndRoles',
  aliases: ['deleteAllChannelsAndRoles', 'del'],
  category: 'Divers',
  description: 'Attention ! Supprime tout les channels et les roles ! - Help for development',
  cooldown: 10,
  usage: '',
  options: {},
  canAdminMention: false,
  isPermissionsRequired: true,
  isArgumentRequired: false,
  needUserMention: false,
  needRoleMention: false,
};
