module.exports.run = async (client, message, args) => {
  const resetAll = args.find((x) => x.toLowerCase() === '--all');
  const resetMeetings = args.find((x) => x.toLowerCase() === '--matches');
  const resetScores = args.find((x) => x.toLowerCase() === '--scores');
  const meetings = (await client.getMeetings()) || [];

  const delChannels = async () => {
    const channels = await message.guild.channels.fetch();
    for (const meeting of meetings) {
      for (const channel of channels.values()) {
        if (meeting.channelId === channel.id) {
          await channel.delete(channel.id);
        }
      }
    }
  };

  if (resetAll !== undefined) {
    const teams = (await client.getTeams()) || [];
    const roles = await message.guild.roles.fetch();

    for (const team of teams) {
      roles.forEach((role) => {
        if (role.id === team.roleId) {
          role.delete();
        }
      });
    }

    delChannels();
    await client.removeTeams();
    await client.removeMeetings();
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

  if (resetScores !== undefined) {
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
    '--scores': 'Reset le score du match en paramètre',
  },
  canAdminMention: false,
  isPermissionsRequired: true,
  isArgumentRequired: true,
  needUserMention: false,
  needRoleMention: false,
};
