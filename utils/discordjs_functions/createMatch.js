const { MessageEmbed } = require('discord.js');

module.exports = (client) => {
  client.createMatch = async (message, team1, team2, stage) => {
    try {
      const commands = client.commands.filter((cat) => cat.help.isPermissionsRequired === false);
      const channel = await message.guild.channels.create(`${stage}eme-${team1.name} vs ${team2.name}`, {
        parent: client.config.CATEGORIES_CHANNELS_ID.stage8,
      });
      const embed = new MessageEmbed().setColor('#36393F').setTitle('Voici la liste des commandes qui vous sont accessibles pour ce tournoi:');

      commands.forEach((command) => {
        embed.addField(`${client.prefix}${command.help.aliases.join(`, ${client.prefix}`)}`, `${command.help.description}`);
      });

      //Ajout des rencontres
      const meetings = (await client.getMeetings()) || [];
      const meeting = await client.addMeeting(`${stage}e${meetings.length + 1}`, channel.id, team1.id, team2.id);

      channel.send({ embeds: [embed] });

      //Ajout des matchs
      for (let i = 1; i <= meeting.BO; i++) {
        await client.addMatch(`${meeting.meetingId}.${i}`, meeting.meetingId);
      }
    } catch (error) {
      console.log(error);
    }
  };
};
