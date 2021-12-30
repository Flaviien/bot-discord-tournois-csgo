module.exports.run = async (client, message, args) => {
  for (const [i, match] of args.entries()) {
    await client.updateCheckin(args[i]);
  }
};

module.exports.help = {
  name: 'checkin',
  aliases: ['checkin'],
  category: 'Oragnisateur',
  description: 'Lance le checkin pour les matchs en paramètres',
  usage: '<id_du_match> <id_du_match>...',
  adminMention: false,
  permissions: true,
  args: true,
  mention: false,
};
