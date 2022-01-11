const models = require('../../database/models/index.js');
const Meeting = models.Meeting;
const MeetingTeams = models.MeetingTeams;

module.exports = (client) => {
  /* client.getMeetingTeams = async (meetings_id) => {
    try {
      const meetings = await MeetingTeams.findAll({ where: { meetings_id } });
      return meetings;
    } catch (error) {
      console.log(error);
    }
  }; */

  client.getMeetings = async () => {
    try {
      const meetings = await Meeting.findAll();
      return meetings;
    } catch (error) {
      console.log(error);
    }
  };

  client.addMeeting = async (meetingId, channelId, teams_id_1, teams_id_2) => {
    try {
      await Meeting.create({ meetingId, channelId, BO: await client.getSetting('default_BO') });
      await MeetingTeams.create({ meetings_id: meetingId, teams_id: teams_id_1 });
      await MeetingTeams.create({ meetings_id: meetingId, teams_id: teams_id_2 });
    } catch (error) {
      console.log(error);
    }
  };

  /* client.removeMeetings = async () => {
    try {
      const meetings = await Meeting.findAll();
      meetings.forEach(async (meeting) => {
        await meeting.destroy();
      });
    } catch (error) {
      console.log(error);
    }
  }; */
};
