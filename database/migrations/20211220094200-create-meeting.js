'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Meetings', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING,
      },
      /* stage: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER,
      }, */
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
