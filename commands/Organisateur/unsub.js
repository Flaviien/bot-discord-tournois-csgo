module.exports.run = async (client, message, args) => {
  /*
  exemple: !unsub @equipe1
  Supprime le role de l'équipe
  Supprime le channel de l'équipe
  Supprime l'équipe en database
  //Supprime les membres en database
  */

  const meetings = await client.getMeetings();
  if (meetings.length !== 0) {
    return message.channel.send(
      `Le tournoi est en cours, vous ne pouvez pas supprimer les équipes. Essayez plutôt la commande ***${client.settings.prefix}ff <@nom_de_l_equipe>***`
    );
  }

  try {
    const teamMention = message.mentions.roles;
    const team = await client.removeTeam(teamMention.firstKey());

    try {
      const keepRole = args.find((x) => x.toLowerCase() === '--keeprole'); //Si --keeprole est trouvé dans les arguments, on effectue pas la suppression du role.
      if (keepRole === undefined) {
        const role = await message.guild.roles.fetch(team.roleId);
        await role.delete();
      }
    } catch (error) {
      console.error(error);
    }

    try {
      const keepChannel = args.find((x) => x.toLowerCase() === '--keepchannel'); //Si --keepchannel est trouvé dans les arguments, on effectue pas la suppression du channel.
      if (keepChannel === undefined) {
        const channel = await message.guild.channels.fetch(team.channelId);
        await channel.delete();
      }
    } catch (error) {
      console.error(error);
    }
  } catch (error) {
    console.error(error);
  }
};

module.exports.help = {
  name: 'unsub',
  aliases: ['unsub'],
  category: 'Organisateur',
  description: 'Désincrit une équipe et ses membres du tournois',
  usage: '<@nom_de_l_equipe>',
  options: {
    '--keepchannel': "Conserve le channel de l'équipe",
    '--keeprole': "Conserve le role de l'équipe",
  },
  canAdminMention: false,
  canUserMention: false,
  canRoleMention: true,
  isPermissionsRequired: true,
  isArgumentRequired: false,
  isUserMentionRequired: false,
  isRoleMentionRequired: true,
};
