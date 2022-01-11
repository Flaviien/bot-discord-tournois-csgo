'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Meeting extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Meeting.hasMany(models.Match, {
        foreignKey: 'meetings_id',
      });
      Meeting.belongsToMany(models.Team, {
        through: 'MeetingTeams',
        foreignKey: 'meetings_id',
      });
    }
  }
  Meeting.init(
    {
      meetingId: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      channelId: DataTypes.STRING,
      winner: DataTypes.STRING,
      BO: DataTypes.TINYINT,
    },
    {
      sequelize,
      modelName: 'Meeting',
    }
  );
  return Meeting;
};
