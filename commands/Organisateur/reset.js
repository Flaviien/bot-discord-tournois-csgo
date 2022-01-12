module.exports.run = async (client, message, args) => {
  const resetAll = args.find((x) => x.toLowerCase() === '--reset-all');
  const resetMeetings = args.find((x) => x.toLowerCase() === '--matches');
  const meetings = await client.getMeetings();

  const delChannels = async () => {
    const channels = await message.guild.channels.fetch();
    meetings.forEach((meeting) => {
      channels.forEach(async (channel) => {
        if (meeting.channelId === channel.id) {
          await channel.delete(channel.id);
        }
      });
    });
  };

  if (resetAll !== undefined) {
    const teams = await client.getTeams();
    const roles = await message.guild.roles.fetch();

    for (const team of teams) {
      roles.forEach((role) => {
        if (role.id === team.roleId) {
          role.delete(role.id);
        }
      });
    }

    delChannels();
    await client.removeTeams();
    //Les mettings sont supprimés en cascade.
    /* if () {
      await message.channel.send('Les équipes et les matchs en cours ont été supprimés.');
    } else {
      await message.channel.send("Erreur, les équipes et les matchs en cours n'ont pas été supprimés.");
    } */
  }

  if (resetMeetings !== undefined) {
    delChannels();
    await client.removeMeetings();
    /* if () {
      await message.channel.send('Les matchs en cours ont été supprimés.');
    } else {
      await message.channel.send("Erreur, les matchs en cours n'ont pas été supprimés.");
    } */
  }
};

module.exports.help = {
  name: 'reset',
  aliases: ['reset'],
  category: 'Organisateur',
  description: 'Reset le tournoi. Attention, la commande ne demande pas de confirmation.',
  usage: '',
  options: {
    '--reset-all': 'Reset tout le tournoi',
    '--matches': 'Reset uniquement les matchs',
  },
  canAdminMention: false,
  isPermissionsRequired: true,
  isArgumentRequired: true,
  needUserMention: false,
  needRoleMention: false,
};
