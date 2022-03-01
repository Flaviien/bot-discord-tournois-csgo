'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Meetings', {
      id: {
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.INTEGER,
      },
      stage: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      subStage: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      channelId: {
        allowNull: false,
        type: Sequelize.STRING,
        unique: true,
      },
      winner: {
        type: Sequelize.STRING,
      },
      BO: {
        allowNull: false,
        type: Sequelize.TINYINT,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Meetings');
  },
};
