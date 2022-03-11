'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Settings', [
      {
        name: 'prefix',
        key_string: '!',
      },
      {
        name: 'permissions',
        key_int: 1,
      },
      {
        name: 'nbr_teams',
        key_int: 16,
      },
      {
        name: 'checkin_time',
        key_int: 15,
      },
      {
        name: 'veto',
        key_int: 0,
      },
      {
        name: 'BO_stage8',
        key_int: 1,
      },
      {
        name: 'BO_stage4',
        key_int: 1,
      },
      {
        name: 'BO_stage2',
        key_int: 3,
      },
      {
        name: 'BO_stage1',
        key_int: 3,
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Settings', null, {});
  },
};
