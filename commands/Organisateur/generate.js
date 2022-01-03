const { Collection } = require('discord.js');

module.exports.run = async (client, message, args) => {
  const teams = await client.getTeams();
  const nbrTeams = await client.getSetting('nbr_teams');

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

  //Ajout des rencontres
  await client.addMeeting('8e1', teams[0].id, teams[1].id);
  await client.addMeeting('8e2', teams[2].id, teams[3].id);
  await client.addMeeting('8e3', teams[4].id, teams[5].id);
  await client.addMeeting('8e4', teams[6].id, teams[7].id);
  await client.addMeeting('8e5', teams[8].id, teams[9].id);
  await client.addMeeting('8e6', teams[10].id, teams[11].id);
  await client.addMeeting('8e7', teams[12].id, teams[13].id);
  await client.addMeeting('8e8', teams[14].id, teams[15].id);

  //Ajout des matchs
  const meetings = await client.getMeetings();

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
  adminMention: false,
  permissions: true,
  args: false,
  mention: false,
};
