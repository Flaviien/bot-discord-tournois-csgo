module.exports.run = async (client, message, args) => {
  const adminMention = message.mentions.members.first();
  const admins = await client.getAdmins();

  if (args[0] === 'add') {
    const found = admins.find((a) => a.id === adminMention.id);
    if (found != undefined) {
      return message.channel.send(`${adminMention.user.username} est déjà enregistré`);
    } else {
      try {
        const admin = await client.addAdmin(adminMention.id);

        if (admin == undefined) {
          throw new Error(`admin n'est pas définie`);
        }
        return message.channel.send(`${adminMention.user.username} est désormais enregistré`);
      } catch (error) {
        console.error(error);
        return message.channel.send(`***${error}***. ${client.config.ERROR_MESSAGE}`);
      }
    }
  } else if (args[0] === 'remove') {
    const found = admins.find((a) => a.id === adminMention.id);
    if (found != undefined) {
      try {
        const admin = await client.removeAdmin(adminMention.id);
        if (admin == undefined) {
          throw new Error(`admin n'est pas définie`);
        }
        return message.channel.send(`${adminMention.user.username} n'est désormais plus enregistré`);
      } catch (error) {
        console.error(error);
        return message.channel.send(`***${error}***. ${client.config.ERROR_MESSAGE}`);
      }
    } else {
      return message.channel.send(`${adminMention.user.username} n'est pas enregistré`);
    }
  } else {
    return message.channel.send(`Erreur dans la commande. **${client.settings.prefix}help admin** pour plus d'info`);
  }
};

module.exports.help = {
  name: 'admin',
  aliases: ['admin'],
  description: "Permet d'ajouter ou de retirer un admin",
  usage: `+ \n
  <add> <@admin>\n
  <remove> <@admin>`,
  canAdminMention: true,
  canUserMention: true,
  canRoleMention: false,
  isPermissionsRequired: true,
  isArgumentRequired: true,
  isUserMentionRequired: true,
  isRoleMentionRequired: false,
};
