module.exports.run = async (client, message, args) => {
  const discordMember = message.member;
  const member = await client.getMember(discordMember.nickname ? discordMember.nickname : discordMember.user.username);
  const team = (await member?.getTeam()) || [];
  const match = client.matches.get(team.name);

  if (team.length === 0) {
    return;
  }

  if (match) {
    const meetings = await team.getMeetings();
    let meeting;
    for (const m of meetings) {
      //Si il y à un gagnant à la rencontre, le match est fini donc on passe au prochain.
      //Si il n'y à pas de gagnant, on veux selectionner celui-là.
      if (m.winner === null) {
        meeting = m;
      }
    }

    const channel = message.guild.channels.cache.get(meeting.channelId);
    if (message.channel.id === channel.id) {
      if (match.checkin === 1) {
        client.matches.set(team.name, { matchId: match.matchId, checkin: 2 });
        channel.send(`${team.name} est là !`);

        //Récupération des 2 équipes
        const matches = [];
        client.matches.forEach((m) => {
          if (m.matchId === match.matchId) {
            matches.push(m);
          }
        });

        //Si les 2 on "checkin" à "2"
        if (matches[0].checkin === 2 && matches[1].checkin === 2) {
          channel.send(`Le match va commencer`);
        }
      }
      if (match.checkin === 2) {
        channel.send(`${team.name} s'est déjà présentée`);
      }
    }
  }
};

module.exports.help = {
  name: 'ready',
  aliases: ['ready'],
  category: 'Participant',
  description: 'Permet à une équipe de valider son checkin',
  cooldown: 0,
  usage: '',
  canAdminMention: false,
  isPermissionsRequired: false,
  isArgumentRequired: false,
  needUserMention: false,
  needRoleMention: false,
};
