const { MessageEmbed } = require('discord.js');

module.exports.run = async (client, message, args) => {
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
};

module.exports.help = {
  name: 'infostreams',
  aliases: ['infostreams', 'is'],
  description: 'Retourne la liste des streams en cours',
  cooldown: 30,
  usage: '',
  canAdminMention: false,
  canUserMention: false,
  canRoleMention: false,
  isPermissionsRequired: false,
  isArgumentRequired: false,
  isUserMentionRequired: false,
  isRoleMentionRequired: false,
};
