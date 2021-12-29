module.exports.run = async (client, message, args) => {
  /*
  exemple: !sub equipe1 leader1 member2 member3 member4 member5
  Crée le role de l'équipe
  Ajoute l'équipe en database
  Crée le channel de l'équipe
  Ajoute les membres en database
  */
  const teamName = args[0];
  const mentions = Array.from(await message.mentions.users.values()); //Transforme les mentions (MapIterator en Array)
  const leader = mentions[0];
  const members = mentions.slice(1); //Récupere toutes les mentions sauf le leader

  const getTeam = await client.getTeam(teamName);
  if (
    getTeam != null &&
    getTeam.name.toLowerCase() === teamName.toLowerCase()
  ) {
    return message.channel.send(`Cette équipe existe déjà`);
  }

  if (args.length < 2) {
    message.channel.send('Veuillez indiquer au moins un capitaine');
    return;
  } else {
    const role = await message.guild.roles.create({
      name: `${teamName}`,
      color: 'RANDOM',
    });
    await client.addTeam(teamName, role.id);
    // await message.guild.channels.create(`${teamName}`);
    await client.addMember(teamName, leader.id, leader.username, true);
    members.forEach(async (member) => {
      await client.addMember(teamName, member.id, member.username);
    });
  }
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
