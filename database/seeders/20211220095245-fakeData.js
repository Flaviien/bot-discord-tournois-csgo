'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert('Admins', [
      {
        name: 'Jean',
      },
      {
        name: 'Jules',
      },
    ]);

    await queryInterface.bulkInsert('Settings', [
      {
        name: 'prefix',
        key_string: '!',
      },
    ]);

    await queryInterface.bulkInsert('Streams', [
      {
        name: 'Florian',
        url: 'https://twitch.fr/Florian',
      },
      {
        name: 'Quentin',
        url: 'https://twitch.fr/Quentin',
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Admins', null, {});
    await queryInterface.bulkDelete('Settings', null, {});
    await queryInterface.bulkDelete('Streams', null, {});
  },
};
