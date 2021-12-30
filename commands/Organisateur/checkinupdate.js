module.exports.run = async (client, message, args) => {
  await client.updateCheckinTimer(args[0]);
};

module.exports.help = {
  name: 'checkinupdate',
  aliases: ['checkinupdate', 'cu'],
  category: 'Organisateur',
  description: 'Modifie le timer du checkin',
  usage: '<nbr_de_minutes>',
  adminMention: false,
  permissions: true,
  args: true,
  mention: false,
};
