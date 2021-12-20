'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Checkin extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Checkin.init({
    teams_id: DataTypes.INTEGER,
    matches_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Checkin',
  });
  return Checkin;
};