module.exports.run = async (client, message, args) => {
  /*
  exemple: !sub equipe1 leader1 member2 member3 member4 member5
  Crée le role de l'équipe
  Ajoute l'équipe en database
  Ajoute les membres en database
  */
  const teamName = args[0];
  const leaderName = args[1];
  const membersName = args.slice(2); //Récupere tous les arguments après l'index 2.

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
    await client.addMember(teamName, leaderName, true);
    membersName.forEach(async (member) => {
      await client.addMember(teamName, member, false);
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
