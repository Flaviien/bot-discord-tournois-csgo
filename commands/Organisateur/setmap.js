module.exports.run = async (client, message, args) => {
  const channelId = message.channel.id;
  const meeting = await client.getMeetingByChannelId(channelId);

  if (meeting == null) {
    return;
  }

  let matchNumber = 1;

  if (meeting.BO > 1) {
    //Si le BO n'est pas BO1, alors on va devoir renseigner sur quel match on veut set la map.
    const args1 = parseInt(args[1]);
    if (isNaN(args1) || args1 > meeting.BO || args1 <= 0) {
      return message.channel.send(`Vous devez indiquer le numéro du match, soit un chiffre entre 1 et ${meeting.BO}`);
    }
    matchNumber = args1;
  }

  const matchesOfThisMeeting = await meeting.getMatches();
  const matchOfThisMeeting = matchesOfThisMeeting.find((m) => m.subId === matchNumber);

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

  const foundMap = mapsName.find((map) => mapName === map);
  if (foundMap === undefined) {
    return message.channel.send(`Cette map n'existe pas. Verifiez son orthographe. Voici la liste des maps disponibles: ${mapsName.join(', ')}`);
  } else {
    const mapModel = await client.getMap(mapName);

    await client.updateMatch(matchOfThisMeeting.id, 'maps_id', mapModel.id);

    message.channel.send(`La **map n°${matchNumber}** a été définie sur **${mapName}**`);
  }
};

module.exports.help = {
  name: 'setmap',
  aliases: ['setmap'],
  description: "Défini la map d'un match. Le numéro du match sera 1, 2 ou 3 pour un BO3. Il peut être omis pour un BO1",
  usage: '<nom_de_la_map> <numéro_du_match>',
  canAdminMention: false,
  canUserMention: false,
  canRoleMention: false,
  isPermissionsRequired: true,
  isArgumentRequired: true,
  isUserMentionRequired: false,
  isRoleMentionRequired: false,
};
