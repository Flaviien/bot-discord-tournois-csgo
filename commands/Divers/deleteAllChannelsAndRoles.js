module.exports.run = async (client, message, args) => {
  const all = args.find((x) => x.toLowerCase() === 'all');
  const c = args.find((x) => x.toLowerCase() === 'c');
  const r = args.find((x) => x.toLowerCase() === 'r');

  const delChannels = async () => {
    const channels = await message.guild.channels.fetch();
    channels.forEach((channel) => {
      if (
        //Accueil et catégories
        channel.id !== '807215053845692466' &&
        channel.id !== '941091287245934603' &&
        channel.id !== '941091317579124756' &&
        channel.id !== '941091338718412840' &&
        channel.id !== '941091405927944244'
      ) {
        channel.delete(channel.id);
      }
    });
  };

  const delRoles = async () => {
    const roles = await message.guild.roles.fetch();
    roles.forEach((role) => {
      if (role.id !== '806577116568223826' && role.id !== '922489307401445427' && role.id !== '804809031763492924') {
        //ni fondateur | ni bot | ni everyone
        role.delete(role.id);
      }
    });
  };

  if (all !== undefined || c !== undefined || r !== undefined) {
    if (all !== undefined) {
      delChannels();
      delRoles();
      return;
    }
    if (c !== undefined) {
      delChannels();
      return;
    }
    if (r !== undefined) {
      delRoles();
      return;
    }
  }
};

module.exports.help = {
  name: 'deleteAllChannelsAndRoles',
  aliases: ['deleteAllChannelsAndRoles', 'del'],
  description: 'Attention ! Supprime tout les channels et les roles ! - Help for development',
  cooldown: 2,
  usage: '',
  canAdminMention: false,
  canUserMention: false,
  canRoleMention: false,
  isPermissionsRequired: true,
  isArgumentRequired: true,
  isUserMentionRequired: false,
  isRoleMentionRequired: false,
};
