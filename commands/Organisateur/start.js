module.exports.run = async (client, message, args) => {
  const channelId = message.channel.id;
  const meeting = await client.getMeetingByChannelId(channelId);

  if (meeting == null) {
    return;
  }

  let matchNumber = 1;

  if (meeting.BO > 1) {
    //Si le BO n'est pas BO1, alors on va devoir renseigner sur quel match on veut set la map.
    const args1 = parseInt(args[0]);
    if (isNaN(args1) || args1 > meeting.BO || args1 <= 0) {
      return message.channel.send(`Vous devez indiquer le numéro du match, soit un chiffre entre 1 et ${meeting.BO}`);
    }
    matchNumber = args1;
  }

  const matchesOfThisMeeting = await meeting.getMatches();
  const matchOfThisMeeting = matchesOfThisMeeting.find((m) => m.subId === matchNumber);

  if (matchOfThisMeeting.status === 'playing') {
    return message.channel.send(`Ce match est déjà en cours`);
  }

  if (matchOfThisMeeting.maps_id === null) {
    return message.channel.send(`Vous devez d'abord définir une map. Essayez la commande ***${client.settings.prefix}setmap <numéro_du_match>***.`);
  }

  if (matchOfThisMeeting.status === 'over') {
    return message.channel.send(`Ce match est déjà fini`);
  }

  await client.updateMatch(matchOfThisMeeting.id, 'status', 'playing');

  message.channel.send(`La **map n°${matchNumber}** va débuter`);
};

module.exports.help = {
  name: 'start',
  aliases: ['start'],
  description: `Quand un match va ou a commencé, faire cette commande passera son statut sur "Match en cours". Le numéro du match sera 1, 2 ou 3 pour un BO3. Il peut être omis pour un BO1`,
  usage: '<numéro_du_match>',
  canAdminMention: false,
  canUserMention: false,
  canRoleMention: false,
  isPermissionsRequired: true,
  isArgumentRequired: false,
  isUserMentionRequired: false,
  isRoleMentionRequired: false,
};
