'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Match extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Match.belongsTo(models.Team, {
        foreignKey: 'teams_id_1',
        foreignKey: 'teams_id_2',
      });
    }
  }
  Match.init(
    {
      matchId: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      teams_id_1: DataTypes.INTEGER,
      teams_id_2: DataTypes.INTEGER,
      isIngame: DataTypes.BOOLEAN,
      winner: DataTypes.STRING,
      score: DataTypes.STRING,
      maps_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Match',
    }
  );
  return Match;
};
