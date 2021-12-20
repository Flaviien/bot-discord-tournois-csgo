'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Match extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Match.init({
    teams_id_1: DataTypes.INTEGER,
    teams_id_2: DataTypes.INTEGER,
    ingame: DataTypes.BOOLEAN,
    winner: DataTypes.STRING,
    score: DataTypes.STRING,
    maps_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Match',
  });
  return Match;
};