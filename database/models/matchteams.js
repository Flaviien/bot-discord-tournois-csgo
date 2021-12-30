'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MatchTeams extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  MatchTeams.init(
    {
      matches_id: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      teams_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      checkin: DataTypes.TINYINT,
    },
    {
      sequelize,
      modelName: 'MatchTeams',
    }
  );
  return MatchTeams;
};
