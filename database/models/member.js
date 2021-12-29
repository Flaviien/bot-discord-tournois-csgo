'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Member extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Member.belongsTo(models.Team, {
        foreignKey: 'teams_id',
      });
    }
  }
  Member.init(
    {
      memberId: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      name: DataTypes.STRING,
      isLeader: DataTypes.BOOLEAN,
      teams_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Member',
    }
  );
  return Member;
};
