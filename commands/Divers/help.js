const { MessageEmbed } = require('discord.js');
const { readdirSync } = require('fs');
const categoryList = readdirSync('./commands');

module.exports.run = async (client, message, args) => {
  const prefix = await client.getSetting('prefix');

  if (!args.length) {
    //Si on écrit !help, sans nom de commande
    const embed = new MessageEmbed()
      .setColor('#36393F')
      .addField(
        'Liste des commandes',
        `Voici la liste de toutes les commandes disponible.\nPour plus d'informations sur une commande, tapez \`${prefix}help <command_name>\``
      );

    for (const category of categoryList) {
      embed.addField(
        `${category}`,
        `${client.commands
          .filter((cat) => cat.help.category.toLocaleLowerCase() === category.toLocaleLowerCase())
          .map((cmd) => cmd.help.name)
          .join(', ')}`
      );
    }

    return message.channel.send({ embeds: [embed] });
  } else {
    //Si on écrit !help <command_name>
    const command = client.commands.get(args[0]) || client.commands.find((cmd) => cmd.help.aliases && cmd.help.aliases.includes(args[0]));

    const embed = new MessageEmbed()
      .setColor('#36393F')
      .setTitle(`\`${command.help.name}\``)
      .addField('Description', `${command.help.description}`)
      .addField('Utilisation', command.help.usage ? `${prefix}${command.help.name} ${command.help.usage}` : `${prefix}${command.help.name}`, true);

    if (command.help.aliases.length > 1) embed.addField('Alias', `${command.help.aliases.join(', ')}`, true);

    return message.channel.send({ embeds: [embed] });
  }
};

module.exports.help = {
  name: 'help',
  aliases: ['help'],
  category: 'Divers',
  description: 'Renvoie une liste de commandes ou les informations sur une commande',
  usage: '<command_name>',
  adminMention: false,
  permissions: false,
  args: false,
  mention: false,
};
