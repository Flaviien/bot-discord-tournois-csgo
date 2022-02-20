module.exports.run = async (client, message, args) => {
  /*
  exemple: !sub equipe1 @leader1 @member2 @member3 @member4 @member5
  Crée le role de l'équipe
  Crée le channel de l'équipe
  Ajoute l'équipe en database
  Ajoute les membres en database
  */

  const teamName = args[0];
  const mentions = message.mentions.members;

  let leaderMention;
  let membersMention = []; //Toutes les mentions sauf le leader

  mentions.forEach((member, id) => {
    if (id === mentions.firstKey()) {
      leaderMention = mentions.first();
    } else {
      membersMention.push(member);
    }
  });

  /* Test si l'équipe existe déjà */
  const teams = await client.getTeams();
  if (teams !== undefined) {
    for (const team of teams) {
      if (team.name === teamName) {
        return message.channel.send(`Cette équipe existe déjà`);
      }
    }
  }

  /* Test si les membres mentionnés sont déjà dans une équipe */
  const members = await client.getMembers();
  if (members !== undefined) {
    let isThisErrorTrigered = false;

    for (const member of members) {
      if (member.memberId === leaderMention.id) {
        message.channel.send(`${leaderMention.nickname !== null ? leaderMention.nickname : leaderMention.user.username} est déjà dans une équipe.`);
        isThisErrorTrigered = true;
      }
      for (const memberMention of membersMention) {
        if (member.memberId === memberMention.id) {
          message.channel.send(`${memberMention.nickname !== null ? memberMention.nickname : memberMention.user.username} est déjà dans une équipe.`);
          isThisErrorTrigered = true;
        }
      }
    }
    if (isThisErrorTrigered) return;
  }

  /*Test si un capitaine a été mentionné. Si oui, tout est bon, on effectue toutes les oppérations. */
  if (leaderMention === undefined) {
    message.channel.send('Veuillez indiquer au moins un capitaine');
    return;
  } else {
    const role = await message.guild.roles.create({
      name: `${teamName}`,
      color: 'RANDOM',
      mentionable: true,
    });

    await client.addTeam(teamName, role.id);

    await client.addMember(teamName, leaderMention.id, leaderMention.nickname !== null ? leaderMention.nickname : leaderMention.user.username, true);
    await leaderMention.roles.add(role);

    membersMention.forEach(async (member) => {
      await client.addMember(teamName, member.id, member.nickname !== null ? member.nickname : member.user.username);
      await member.roles.add(role);
    });
  }
};

module.exports.help = {
  name: 'sub',
  aliases: ['sub'],
  category: 'Organisateur',
  description: 'Enregistre une équipe et les membres correspondant',
  usage: '<nom_de_l_equipe> <@capitaine> <@joueur> <@joueur> ...',
  canAdminMention: false,
  canUserMention: true,
  canRoleMention: false,
  isPermissionsRequired: true,
  isArgumentRequired: true,
  isUserMentionRequired: true,
  isRoleMentionRequired: false,
};
