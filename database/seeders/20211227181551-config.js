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
        name: 'default_BO',
        key_int: 1,
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Settings', null, {});
  },
};
