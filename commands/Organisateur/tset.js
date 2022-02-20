module.exports.run = async (client, message, args) => {
  const setting = args[0].toLowerCase();

  if (setting === 'veto') {
    if (args[1] !== 'true' && args[1] !== 'false') return;
    return message.channel.send(await client.updateVeto(args[1]));
  }

  if (setting === 'bo') {
    if (args[1] !== '1' && args[1] !== '3' && args[1] !== '5') return;
    return message.channel.send(await client.updateBO(args[1]));
  }

  if (setting === 'prefix') {
    if (args[1].length > 2) return;
    return message.channel.send(await client.updatePrefix(args[1]));
  }

  if (setting === 'perm' || setting === 'permission') {
    if (args[1] !== 'true' && args[1] !== 'false') return;
    return message.channel.send(await client.updatePermission(args[1]));
  }

  if (setting === 'checkin') {
    return await client.updateCheckinTimer(args[1]);
  }

  if (setting === 'nbr_teams') {
    return message.channel.send(await client.updateNbrTeams(args[1]));
  }

  if (setting === 'ds' || setting === 'defaultsettings') {
    await client.updatePermission(client.config.DEFAULTSETTINGS.permissions);
    await client.updatePrefix(client.config.DEFAULTSETTINGS.prefix);
    await client.updateNbrTeams(client.config.DEFAULTSETTINGS.nbrTeams);
    await client.updateCheckinTimer(client.config.DEFAULTSETTINGS.checkinTimer);
    await client.updateVeto(client.config.DEFAULTSETTINGS.veto);
    await client.updateBO(client.config.DEFAULTSETTINGS.BO);

    return message.channel.send(`Les paramètres par défaut ont été rétablis.`);
  }
};

module.exports.help = {
  name: 'tset',
  aliases: ['tset'],
  category: 'Organisateur',
  description:
    /* 'Commande pour modifier les paramètres du tournois: veto | bo | prefix | permission | checkin | nbr_teams' */
    'Commande pour modifier les paramètres du tournois.',
  usage: `+ \n
    permission <true/false>: Ajoute ou retire la permission aux partipants de tapper des commandes de tournoi\n
    prefix <new_prefix>: Change le prefix des commandes\n
    veto <true/false>: Active ou désactive la fonction veto.\n
    bo <1 | 3 | 5>: Modifie le BO par défaut. A faire avant la commande 'generate' si on souhaite changer le BO des 1ers matchs du tournoi.\n
    checkin <minutes>: Modifie le timer du checkin, en minute.\n
    nbr_teams <number>: Modifie le nombre d'équipe qui vont participer au tournois\n
    `,
  canAdminMention: false,
  canUserMention: false,
  canRoleMention: false,
  isPermissionsRequired: true,
  isArgumentRequired: false,
  isUserMentionRequired: false,
  isRoleMentionRequired: false,
};
