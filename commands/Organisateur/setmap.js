module.exports.run = async (client, message, args) => {
  const prefix = await client.getSetting('prefix');
  const matchId = args[0];
  const match = (await client.getMatch(matchId)) || [];
  const meetingOfThisMatch = await match.getMeeting();
  const channel = message.guild.channels.cache.get(meetingOfThisMatch.channelId);
  const mapsModel = await client.getMaps();
  const mapsName = [];
  const mapName = args[1].toLowerCase();

  for (const mapModel of mapsModel) {
    mapsName.push(mapModel.name.toLowerCase());
  }

  if (match.status === 'playing') {
    return message.channel.send(`Ce match est déjà en cours`);
  }

  if (match.status === 'over') {
    return message.channel.send(`Ce match est déjà fini`);
  }

  const foundMap = mapsName.find((map) => mapName === map);
  if (foundMap === undefined) {
    return message.channel.send(`Cette map n'existe pas. Verifiez son orthographe. Voici la liste des maps disponible: ${mapsName.join(', ')}`);
  } else {
    const mapModel = await client.getMap(mapName);
    await client.updateMatch(matchId, 'status', 'playing');
    await client.updateMatch(matchId, 'maps_id', mapModel.id);

    channel.send(`La map n°${matchId.charAt(matchId.length - 1)} a été défini sur ${mapName}`);
  }
};

module.exports.help = {
  name: 'setmap',
  aliases: ['setmap'],
  category: 'Organisateur',
  description: 'Défini la map du match en paramètre',
  usage: '<id_du_match> <map>',
  canAdminMention: false,
  isPermissionsRequired: true,
  isArgumentRequired: true,
  needUserMention: false,
  needRoleMention: false,
};
