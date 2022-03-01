module.exports.run = async (client, message, args) => {
  const teamMention = message.mentions.roles.first();
  const team = await client.getTeam('roleId', teamMention.id);

  let matchNumber = 1;

  const meetingsOfThisTeam = await team.getMeetings();
  const meetingOfThisTeam = meetingsOfThisTeam.find((m) => m.winner === null);

  const matchesOfThisMeeting = await meetingOfThisTeam.getMatches();
  const matchOfThisMeeting = matchesOfThisMeeting.find((m) => m.subId === matchNumber);

  const channel = message.guild.channels.cache.get(meetingOfThisTeam.channelId);

  const mapName = args[0].toLowerCase();
  const mapsModel = await client.getMaps();
  const mapsName = [];

  for (const mapModel of mapsModel) {
    mapsName.push(mapModel.name.toLowerCase());
  }

  if (matchOfThisMeeting.status === 'playing') {
    return message.channel.send(`Ce match est déjà en cours`);
  }

  if (matchOfThisMeeting.status === 'over') {
    return message.channel.send(`Ce match est déjà fini`);
  }

  if (meetingOfThisTeam.BO > 1) {
    //Si le BO n'est pas BO1, alors on va devoir renseigner sur quelles match on veut set la map.
    const args1 = parseInt(args[1]);
    if (isNaN(args1) || args1 > meetingOfThisTeam.BO || args1 <= 0) {
      return message.channel.send(`Vous devez indiquer un chiffre entre 1 et ${meetingOfThisTeam.BO}`);
    }
    matchNumber = args1;
  }

  const foundMap = mapsName.find((map) => mapName === map);
  if (foundMap === undefined) {
    return message.channel.send(`Cette map n'existe pas. Verifiez son orthographe. Voici la liste des maps disponible: ${mapsName.join(', ')}`);
  } else {
    const mapModel = await client.getMap(mapName);
    await client.updateMatch(matchOfThisMeeting.id, 'status', 'playing');
    await client.updateMatch(matchOfThisMeeting.id, 'maps_id', mapModel.id);

    channel.send(`La **map n°${matchNumber}** a été défini sur **${mapName}**`);
  }
};

module.exports.help = {
  name: 'setmap',
  aliases: ['setmap'],
  description: "Défini la map d'un match. Le numéro du match sera 1, 2 ou 3 pour un BO3. Il peut être omis pour un BO1",
  usage: '<@équipe> <nom_de_la_map> <numéro_du_match>',
  canAdminMention: false,
  canUserMention: false,
  canRoleMention: true,
  isPermissionsRequired: true,
  isArgumentRequired: true,
  isUserMentionRequired: false,
  isRoleMentionRequired: true,
};
