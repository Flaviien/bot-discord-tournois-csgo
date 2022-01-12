const { MessageEmbed } = require('discord.js');

module.exports.run = async (client, message, args) => {
  const prefix = await client.getSetting('prefix');
  const teams = await client.getTeams();
  const nbrTeams = await client.getSetting('nbr_teams');
  const commands = client.commands.filter((cat) => cat.help.isPermissionsRequired === false);
  const meetings = await client.getMeetings();

  if (meetings.length > 0) {
    return message.channel.send(
      `Des matchs sont déjà programmés.\n
      Si vous souhaitez reinitialiser le tournoi, utilisez la commande ${prefix}reset en indiquant l'option appropriée (--reset-all ou --reset-matches).`
    );
  }

  if (teams.length !== nbrTeams) {
    return message.channel.send(`Le nombre d'équipe pour générer les rencontres n'est pas suffisant: ${teams.length}/${nbrTeams}`);
  }

  //Boucle qui mélange un tableau (modifie le tableau d'origine)
  for (let i = teams.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = teams[i];
    teams[i] = teams[j];
    teams[j] = temp;
  }

  for (let i = 0; i < nbrTeams / 2; i++) {
    //Création des channels
    const channel = await message.guild.channels.create(`${teams[i * 2].name} vs ${teams[i * 2 + 1].name}`);

    const embed = new MessageEmbed().setColor('#36393F').setTitle('Voici la liste des commandes qui vous sont accessibles pour ce tournoi:');

    commands.forEach((command) => {
      embed.addField(`${prefix}${command.help.aliases.join(', ')}`, `${command.help.description}`);
    });

    channel.send({ embeds: [embed] });

    //Ajout des rencontres
    await client.addMeeting(`8e${i + 1}`, channel.id, teams[i * 2].id, teams[i * 2 + 1].id);
  }

  //Ajout des matchs
  for (const meeting of meetings) {
    for (let i = 1; i <= meeting.BO; i++) {
      await client.addMatch(`${meeting.meetingId}.${i}`, meeting.meetingId);
    }
  }
};

module.exports.help = {
  name: 'generate',
  aliases: ['generate', 'gen'],
  category: 'Organisateur',
  description: "Génère l'arbre initial grâce aux équipes enregistrées",
  usage: '',
  canAdminMention: false,
  isPermissionsRequired: true,
  isArgumentRequired: false,
  needUserMention: false,
  needRoleMention: false,
};
