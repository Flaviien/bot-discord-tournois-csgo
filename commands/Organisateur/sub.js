module.exports.run = async (client, message, args) => {
  //TODO
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
  mention: true,
};
