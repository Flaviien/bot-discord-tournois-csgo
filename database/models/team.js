'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Team extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Team.hasMany(models.Member, {
        foreignKey: 'teams_id',
      });
      Team.belongsToMany(models.Meeting, {
        through: 'MeetingTeams',
        foreignKey: 'teams_id',
      });
    }
  }
  Team.init(
    {
      name: DataTypes.STRING,
      roleId: DataTypes.STRING,
      channelId: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Team',
    }
  );
  return Team;
};
