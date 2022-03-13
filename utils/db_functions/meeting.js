const models = require('../../database/models/index.js');
const Meeting = models.Meeting;
const MeetingTeams = models.MeetingTeams;
const { Op } = require('sequelize');

module.exports = (client) => {
  client.getMeeting = async (id) => {
    try {
      const meeting = await Meeting.findOne({ where: { id } });
      return meeting;
    } catch (error) {
      console.error(error);
    }
  };

  client.getMeetingByChannelId = async (channelId) => {
    try {
      const meeting = await Meeting.findOne({ where: { channelId } });
      return meeting;
    } catch (error) {
      console.error(error);
    }
  };

  client.getMeetingByStageAndSubStage = async (stage, subStage) => {
    try {
      const meeting = await Meeting.findOne({ where: { stage, subStage } });
      return meeting;
    } catch (error) {
      console.error(error);
    }
  };

  client.getMeetings = async () => {
    try {
      const meetings = await Meeting.findAll();
      return meetings;
    } catch (error) {
      console.error(error);
    }
  };

  client.addMeeting = async (stage, subStage, channelId, teams_id_1, teams_id_2) => {
    let BO_stage = '';
    if (stage === 8) {
      BO_stage = 'BO_stage8';
    } else if (stage === 4) {
      BO_stage = 'BO_stage4';
    } else if (stage === 2) {
      BO_stage = 'BO_stage2';
    } else if (stage === 1) {
      BO_stage = 'BO_stage1';
    }
    try {
      const meeting = await Meeting.create({ stage, subStage, channelId, BO: client.settings[BO_stage] });
      await MeetingTeams.create({ meetings_id: meeting.id, teams_id: teams_id_1 });
      await MeetingTeams.create({ meetings_id: meeting.id, teams_id: teams_id_2 });
      return meeting;
    } catch (error) {
      console.error(error);
    }
  };

  client.updateMeeting = async (id, key, value) => {
    try {
      const meeting = await client.getMeeting(id);
      await meeting.update({ [key]: value });
    } catch (error) {
      console.error(error);
    }
  };

  client.removeMeeting = async (id) => {
    //Les matchs sont supprimés en cascade.
    try {
      const meeting = await Meeting.findOne({ where: { id } });
      await meeting.destroy();
    } catch (error) {
      console.error(error);
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
      console.error(error);
    }
  };
};
