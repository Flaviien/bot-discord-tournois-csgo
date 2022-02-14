const { MessageEmbed } = require('discord.js');

module.exports = (client) => {
  client.createMatch = async (message, team1, team2, stage) => {
    try {
      let channelPrefix = '';
      let channelParent = '';
      if (stage === 8) {
        channelPrefix = '8eme';
        channelParent = 'stage8';
      } else if (stage === 4) {
        channelPrefix = 'Quart';
        channelParent = 'stage4';
      } else if (stage === 2) {
        channelPrefix = 'Demi-finales';
        channelParent = 'stage2';
      } else if (stage === 1) {
        channelPrefix = 'Finale';
        channelParent = 'stage1';
      }
      const commands = client.commands.filter((cat) => cat.help.isPermissionsRequired === false);
      const channel = await message.guild.channels.create(`${channelPrefix}-${team1.name} vs ${team2.name}`, {
        parent: client.config.CATEGORIES_CHANNELS_ID[channelParent],
      });
      const embed = new MessageEmbed().setColor('#36393F').setTitle('Voici la liste des commandes qui vous sont accessibles pour ce tournoi:');

      commands.forEach((command) => {
        embed.addField(`${client.settings.prefix}${command.help.aliases.join(`, ${client.settings.prefix}`)}`, `${command.help.description}`);
      });

      //Ajout des rencontres
      const meetings = (await client.getMeetings()) || [];
      const numberOfMeetingOfThisStage = meetings.filter((m) => m.meetingId.charAt(0) === stage.toString()).length;
      const meeting = await client.addMeeting(`${stage}e${numberOfMeetingOfThisStage + 1}`, channel.id, team1.id, team2.id);

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
