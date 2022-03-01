'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Matches', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER,
        autoIncrement: true,
      },
      subId: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      meetings_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Meetings',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      status: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      winner: {
        type: Sequelize.STRING,
      },
      score: {
        type: Sequelize.STRING,
      },
      maps_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Maps',
          key: 'id',
        },
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
