const { MessageEmbed } = require('discord.js');

module.exports.run = async (client, message, args) => {
  const teams = (await client.getTeams()) || [];
  const nbrTeams = await client.getSetting('nbr_teams');
  const commands = client.commands.filter((cat) => cat.help.isPermissionsRequired === false);
  let meetings = await client.getMeetings();

  if (meetings.length > 0) {
    return message.channel.send(
      `Des matchs sont déjà programmés.\n
      Si vous souhaitez reinitialiser le tournoi, utilisez la commande ***${client.settings.prefix}reset*** en indiquant l'option appropriée ***(--all ou --matches)***.`
    );
  }

  if (teams.length < nbrTeams) {
    return message.channel.send(`Le nombre d'équipe pour générer les rencontres n'est pas suffisant: ${teams.length}/${nbrTeams}`);
  }
  if (teams.length > nbrTeams) {
    return message.channel.send(`Le nombre d'équipe pour générer les rencontres est trop élevé: ${teams.length}/${nbrTeams}\n
    Vous pouvez utiliser la commande ***${client.settings.prefix}unsub <@equipe>*** pour désinscrire une équipe.`);
  }

  //Boucle qui mélange un tableau (modifie le tableau d'origine)
  for (let i = teams.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = teams[i];
    teams[i] = teams[j];
    teams[j] = temp;
  }

  for (let i = 0; i < nbrTeams / 2; i++) {
    await client.createMatch(message, teams[i * 2], teams[i * 2 + 1], nbrTeams / 2);
  }
};

module.exports.help = {
  name: 'generate',
  aliases: ['generate', 'gen'],
  description: "Génère l'arbre initial grâce aux équipes enregistrées",
  usage: '',
  canAdminMention: false,
  canUserMention: false,
  canRoleMention: false,
  isPermissionsRequired: true,
  isArgumentRequired: false,
  isUserMentionRequired: false,
  isRoleMentionRequired: false,
};
