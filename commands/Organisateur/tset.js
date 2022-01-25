module.exports.run = async (client, message, args) => {
  const setting = args[0].toLowerCase();

  if (setting === 'veto') {
    if (args[1] !== 'true' && args[1] !== 'false') return;
    message.channel.send(await client.updateVeto(args[1]));
  }

  if (setting === 'bo') {
    if (args[1] !== '1' && args[1] !== '3' && args[1] !== '5') return;
    message.channel.send(await client.updateBO(args[1]));
  }

  if (setting === 'prefix') {
    if (args[1].length > 2) return;
    message.channel.send(await client.updatePrefix(args[1]));
  }

  if (setting === 'perm' || setting === 'permission') {
    if (args[1] !== 'true' && args[1] !== 'false') return;
    message.channel.send(await client.updatePermission(args[1]));
  }

  if (setting === 'checkin') {
    await client.updateCheckinTimer(args[0]);
  }

  if (setting === 'nbr_teams') {
    message.channel.send(await client.updateNbrTeams(args[1]));
  }

  if (setting === 'ds' || setting === 'defaultsettings') {
    await client.updatePermission('true');
    await client.updatePrefix('!');
    await client.updateNbrTeams('16');
    await client.updateCheckinTimer('15');
    await client.updateVeto('0');
    await client.updateBO('1');
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
    veto <true/false/start>: Active ou désactive la fonction veto. Start: Lance la fonction manuellement\n
    bo <1 | 3 | 5>: Modifie le BO par défaut. A faire avant la commande 'generate' si on souhaite changer le BO des 1ers matchs du tournoi.\n
    checkin <minutes>: Modifie le timer du checkin, en minute.\n
    nbr_teams <number>: Modifie le nombre d'équipe qui vont participer au tournois\n
    `,
  canAdminMention: false,
  isPermissionsRequired: true,
  isArgumentRequired: false,
  needUserMention: false,
  needRoleMention: false,
};
