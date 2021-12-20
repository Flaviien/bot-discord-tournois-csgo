'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Matches', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.FLOAT,
      },
      teams_id_1: {
        type: Sequelize.INTEGER,
      },
      teams_id_2: {
        type: Sequelize.INTEGER,
      },
      ingame: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
      },
      winner: {
        type: Sequelize.STRING,
      },
      score: {
        type: Sequelize.STRING,
      },
      maps_id: {
        type: Sequelize.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW'),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW'),
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Matches');
  },
};
