module.exports.run = async (client, message, args, options) => {
  const resetAll = options.find((x) => x.toLowerCase() === '--all');
  const resetMeetings = options.find((x) => x.toLowerCase() === '--matches');
  const resetScores = options.find((x) => x.toLowerCase() === '--scores');
  const meetings = (await client.getMeetings()) || [];
  const nbrTeams = await client.getSetting('nbr_teams');

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

  if (resetAll != undefined) {
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

  if (resetMeetings != undefined) {
    delChannels();
    await client.removeMeetings();
    /* if () {
      await message.channel.send('Les matchs en cours ont été supprimés.');
    } else {
      await message.channel.send("Erreur, les matchs en cours n'ont pas été supprimés.");
    } */
  }

  if (resetScores != undefined) {
    for (const meeting of meetings) {
      if (meeting.meetingId.charAt(0) != nbrTeams / 2) {
        //TODO
      }
    }
  }
};

module.exports.help = {
  name: 'reset',
  aliases: ['reset'],
  category: 'Organisateur',
  description: 'Reset le tournoi. Attention, la commande ne demande pas de confirmation.',
  usage: '',
  options: {
    '--all': 'Reset tout le tournoi',
    '--matches': 'Reset uniquement les matchs',
    '--scores': "Reset les scores mais garde l'arbre initial",
  },
  canAdminMention: false,
  isPermissionsRequired: true,
  isArgumentRequired: true,
  needUserMention: false,
  needRoleMention: false,
};
