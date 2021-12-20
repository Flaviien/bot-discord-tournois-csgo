'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Mappool extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Mappool.init({
    name: DataTypes.STRING,
    maps_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Mappool',
  });
  return Mappool;
};