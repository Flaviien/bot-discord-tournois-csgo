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
      Match.belongsToMany(models.Team, {
        through: 'MatchTeams',
        foreignKey: 'matches_id',
      });
    }
  }
  Match.init(
    {
      matchId: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
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
