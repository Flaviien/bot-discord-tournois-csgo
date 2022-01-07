module.exports.run = async (client, message, args) => {
  /*
  exemple: !sub equipe1 leader1 member2 member3 member4 member5
  Crée le role de l'équipe
  Crée le channel de l'équipe
  Ajoute l'équipe en database
  Ajoute les membres en database
  */
  const teamName = args[0];
  const mentions =
    message.mentions
      .members; /* Array.from(await message.mentions.users.values()); */ //Transforme les mentions (MapIterator en Array)
  // let leader;
  // let members; //Toutes les mentions sauf le leader
  //const members = mentions.slice(1); //Récupere toutes les mentions sauf le leader

  const members = mentions.forEach((member) => {});

  /* const teams = await client.getTeams();

  if (teams !== undefined) {
    for (const team of teams) {
      if (team.name === teamName) {
        return message.channel.send(`Cette équipe existe déjà`);
      }
    }
  } */

  /* if (args.length < 2) {
    message.channel.send('Veuillez indiquer au moins un capitaine');
    return;
  } else {
    const role = await message.guild.roles.create({
      name: `${teamName}`,
      color: 'RANDOM',
    });
    const channel = await message.guild.channels.create(`${teamName}`);

    await client.addTeam(teamName, role.id, channel.id);

    await client.addMember(teamName, leader.id, leader.username, true);
    await leader.roles.add(role);

    members.forEach(async (member) => {
      await client.addMember(teamName, member.id, member.username);
      await member.roles.add(role);
    });
  } */
};

module.exports.help = {
  name: 'sub',
  aliases: ['sub'],
  category: 'Organisateur',
  description: 'Enregistre une équipe et les membres correspondant',
  usage: '<nom_de_l_equipe> <@nom_du_capitaine> <@nom_des_joueurs>*4',
  adminMention: false,
  permissions: true,
  args: true,
  mention: false,
};
