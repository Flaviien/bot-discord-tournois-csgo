/* 
  Cet event est trigger lorsqu'un message est écrit.
  Il y a une série de vérification du message (bot, prefix, permissions, ...),
  pour savoir comment le traiter avant d'arriver à la fin du code (command.run).
*/

module.exports = async (client, message) => {
  if (message.content.includes('discord.gg/')) {
    message.delete();
    //TODO: Faire un système d'avertissement.
  }

  const prefix = await client.getPrefix();

  if (message.author.bot) return; //Si le message est écrit par un bot.
  if (!message.content.startsWith(prefix)) return; //Si le message n'a pas de préfix.

  const args = message.content.slice(prefix.length).split(/ +/);
  const commandName = args.shift().toLowerCase();

  const command =
    client.commands.get(commandName) ||
    client.commands.find(
      (cmd) => cmd.help.aliases && cmd.help.aliases.includes(commandName)
    );
  if (!command) return;

  if (
    command.help.permissions &&
    !message.member.permissions.has('BAN_MEMBERS')
  ) {
    //Si l'utilisateur n'a pas les droits
    return message.reply(
      "Tu n'a pas les permissions pour taper cette commande !"
    );
  }

  if (command.help.args && !args.length) {
    //Si la commande n'a pas d'argmument, alors qu'elle en necessite au moins un. (args = true)
    let noArgsReply = `Votre commande est incomplète, ${message.author} !`;
    if (command.help.usage) {
      //Si on est ici, c'est que l'utilisateurs à oublié le/les argument(s). Donc on va lui préciser comment utiliser la commande.
      noArgsReply += `\nVoici comment utiliser la commande: \` ${prefix}${command.help.name} ${command.help.usage} \``;
    }
    return message.channel.send(noArgsReply);
  }

  if (command.help.mention) {
    let user = message.mentions.users.first();

    if (user === undefined)
      return message.reply('Il faut mentionner un utilisateur.');
    if (user.bot) return message.reply('Vous ne pouvez pas mentionner un bot.');

    if (
      !command.help.adminMention &&
      message.guild.member(user).permissions.has('BAN_MEMBERS')
    ) {
      //Si la cible de la commande est un admin/modo
      return message.reply(
        'Tu ne peux pas utiliser cette commande sur cette utilisateur.'
      );
    }
  }

  command.run(client, message, args);
};
