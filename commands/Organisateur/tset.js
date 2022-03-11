module.exports.run = async (client, message, args) => {
  const setting = args[0].toLowerCase();

  if (setting === 'veto') {
    if (args[1] !== 'true' && args[1] !== 'false') return;
    return message.channel.send(await client.updateVeto(args[1]));
  }

  if (setting === 'bo_stage8') {
    if (args[1] !== '1' && args[1] !== '3' && args[1] !== '5') return;
    return message.channel.send(await client.updateBO(args[1], 'BO_stage8'));
  }

  if (setting === 'bo_stage4') {
    if (args[1] !== '1' && args[1] !== '3' && args[1] !== '5') return;
    return message.channel.send(await client.updateBO(args[1], 'BO_stage4'));
  }

  if (setting === 'bo_stage2') {
    if (args[1] !== '1' && args[1] !== '3' && args[1] !== '5') return;
    return message.channel.send(await client.updateBO(args[1], 'BO_stage2'));
  }

  if (setting === 'bo_stage1') {
    if (args[1] !== '1' && args[1] !== '3' && args[1] !== '5') return;
    return message.channel.send(await client.updateBO(args[1], 'BO_stage1'));
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
    if (args[1] === '32' || args[1] === '16' || args[1] === '8') {
      return message.channel.send(await client.updateNbrTeams(args[1]));
    } else {
      return message.channel.send(`Le nombre d'équipes autorisées au tournoi sont de 32, 16 ou 8`);
    }
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
  description:
    /* 'Commande pour modifier les paramètres du tournois: veto | bo | prefix | permission | checkin | nbr_teams' */
    'Commande pour modifier les paramètres du tournois.',
  usage: `+ \n
    permission <true/false>: Ajoute ou retire la permission aux partipants de tapper des commandes de tournoi\n
    prefix <new_prefix>: Change le prefix des commandes\n
    veto <true/false>: Active ou désactive la fonction veto.\n
    bo_stage8 <1 | 3 | 5>: Modifie le BO des matchs de 8ème. A faire avant la création du moindre match.\n
    bo_stage4 <1 | 3 | 5>: Modifie le BO des matchs de Quart. A faire avant la création des matchs de Quart.\n
    bo_stage2 <1 | 3 | 5>: Modifie le BO des matchs de Demi-finales. A faire avant la création des matchs de Demi-finales.\n
    bo_stage1 <1 | 3 | 5>: Modifie le BO du match de finale. A faire avant la création du match de la finale .\n
    checkin <minutes>: Modifie le timer du checkin, en minute.\n
    nbr_teams <32 | 16 | 8>: Modifie le nombre d'équipe qui vont participer au tournois\n
    `,
  canAdminMention: false,
  canUserMention: false,
  canRoleMention: false,
  isPermissionsRequired: true,
  isArgumentRequired: false,
  isUserMentionRequired: false,
  isRoleMentionRequired: false,
};
