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

    message.channel.send(await client.addStream(name, url));
  }

  if (args[0] === 'remove') {
    const name = args[1];
    message.channel.send(await client.removeStream(name));
  }
};

module.exports.help = {
  name: 'stream',
  aliases: ['stream'],
  category: 'Organisteur',
  description: "Permet d'ajouter ou de retirer un stream à la liste des streams en cours",
  usage: `+ \n
  <add> <nom_du_streamer> <url>\n
  <remove> <nom_du_streamer>`,
  canAdminMention: false,
  canUserMention: false,
  canRoleMention: false,
  isPermissionsRequired: true,
  isArgumentRequired: false,
  isUserMentionRequired: false,
  isRoleMentionRequired: false,
};
