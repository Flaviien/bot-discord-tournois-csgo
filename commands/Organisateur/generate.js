module.exports.run = async (client, message, args) => {
  const teams = await client.getTeams();
  const nbrTeams = await client.getNbrTeams();

  if (teams.length !== nbrTeams) {
    return message.channel.send(
      `Le nombre d'équipe pour générer les matchs n'est pas suffisant: ${teams.length}/${nbrTeams}`
    );
  }

  const shuffleArray = (array) => {
    //Fonction qui mélange un tableau (modifie le tableau d'origine)
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
  };

  shuffleArray(teams);

  await client.addMatch('8e1', teams[0].id, teams[1].id);
  await client.addMatch('8e2', teams[2].id, teams[3].id);
  await client.addMatch('8e3', teams[4].id, teams[5].id);
  await client.addMatch('8e4', teams[6].id, teams[7].id);
  await client.addMatch('8e5', teams[8].id, teams[9].id);
  await client.addMatch('8e6', teams[10].id, teams[11].id);
  await client.addMatch('8e7', teams[12].id, teams[13].id);
  await client.addMatch('8e8', teams[14].id, teams[15].id);
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
