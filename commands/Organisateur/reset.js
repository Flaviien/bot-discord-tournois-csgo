module.exports.run = async (client, message, args, options) => {
  const resetAll = options.find((x) => x.toLowerCase() === '--all');
  const resetMeetings = options.find((x) => x.toLowerCase() === '--matches');
  const resetScores = options.find((x) => x.toLowerCase() === '--scores');
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
    try {
      for (const meeting of meetings) {
        if (meeting.stage != client.settings.nbrTeams / 2) {
          await client.removeMeeting(meeting.id);
        }
        await client.updateMeeting(meeting.id, 'winner', null);
        const matches = await meeting.getMatches();
        for (const match of matches) {
          await client.updateMatch(match.id, 'status', 'waiting');
          await client.updateMatch(match.id, 'winner', null);
          await client.updateMatch(match.id, 'score', null);
          await client.updateMatch(match.id, 'maps_id', null);
        }
      }
    } catch (error) {
      console.error(error);
    }
  }
};

module.exports.help = {
  name: 'reset',
  aliases: ['reset'],
  description: "Reset le tournois, les matchs ou les scores en fontion de l'option choisie. Attention, la commande ne demande pas de confirmation.",
  usage: '',
  options: {
    '--all': 'Reset les équipes et les matchs',
    '--matches': 'Reset uniquement les matchs',
    '--scores': "Reset uniquement les scores. Conserve l'arbre initial",
  },
  canAdminMention: false,
  canUserMention: false,
  canRoleMention: false,
  isPermissionsRequired: true,
  isArgumentRequired: false,
  isUserMentionRequired: false,
  isRoleMentionRequired: false,
};
