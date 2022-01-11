const { MessageEmbed } = require('discord.js');

module.exports.run = async (client, message, args) => {
  if (args.length === 0) {
    const streams = await client.getStreams();

    if (typeof streams == 'string') message.channel.send(streams); // Si il n'y à pas de stream en cours, return un message.

    if (typeof streams == 'object' && streams.length !== 0) {
      // Affiche les stream en cours.
      const embed = new MessageEmbed().setColor('#C016FF').setTitle('Voici la liste des streams en cours:');

      streams.forEach((stream) => {
        embed.addField(`${stream.name} :`, `${stream.url}`);
      });

      message.channel.send({ embeds: [embed] });
    }
  }

  if (args[0] === 'add') {
    const name = args[1];
    const url = args[2];

    client.addStream(name, url);
  }

  if (args[0] === 'update') {
    const name = args[1];
    const url = args[2];

    message.channel.send(await client.updateStream(name, url));
  }

  if (args[0] === 'remove') {
    const name = args[1];
    message.channel.send(await client.removeStream(name));
  }
};

module.exports.help = {
  name: 'stream',
  aliases: ['stream'],
  category: 'Infos',
  description: "Permet d'afficher, d'ajouter, de modifier ou de retirer un stream en cours",
  cooldown: 30,
  usage: '',
  options: {},
  canAdminMention: false,
  isPermissionsRequired: false,
  isArgumentRequired: false,
  needUserMention: false,
  needRoleMention: false,
};
