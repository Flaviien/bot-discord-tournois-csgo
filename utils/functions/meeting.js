const models = require('../../database/models/index.js');
const Meeting = models.Meeting;
const MeetingTeams = models.MeetingTeams;
const { Op } = require('sequelize');

module.exports = (client) => {
  /* client.getMeetingTeams = async (meetings_id) => {
    try {
      const meetings = await MeetingTeams.findAll({ where: { meetings_id } });
      return meetings;
    } catch (error) {
      console.log(error);
    }
  }; */

  client.getMeeting = async (meetingId) => {
    try {
      const meeting = await Meeting.findOne({ where: { meetingId } });
      return meeting;
    } catch (error) {
      console.log(error);
    }
  };

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
      const meeting = await Meeting.create({ meetingId, channelId, BO: await client.getSetting('default_BO') });
      await MeetingTeams.create({ meetings_id: meetingId, teams_id: teams_id_1 });
      await MeetingTeams.create({ meetings_id: meetingId, teams_id: teams_id_2 });
      return meeting;
    } catch (error) {
      console.log(error);
    }
  };

  client.updateMeeting = async (meetingId, key, value) => {
    try {
      const meeting = await client.getMeeting(meetingId);
      await meeting.update({ [key]: value });
    } catch (error) {
      console.log(error);
    }
  };

  client.removeMeetings = async () => {
    //Les matchs sont supprimés en cascade.
    try {
      const meetings = await Meeting.findAll();
      meetings.forEach(async (meeting) => {
        await meeting.destroy();
      });
    } catch (error) {
      console.log(error);
    }
  };
};
