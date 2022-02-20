'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Admins', [
      {
        id: '281520792880021504',
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

    await queryInterface.bulkInsert('Maps', [
      {
        name: 'inferno',
      },
      {
        name: 'mirage',
      },
      {
        name: 'nuke',
      },
      {
        name: 'overpass',
      },
      {
        name: 'dust2',
      },
      {
        name: 'vertigo',
      },
      {
        name: 'ancient',
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Admins', null, {});
    await queryInterface.bulkDelete('Ips', null, {});
    await queryInterface.bulkDelete('Streams', null, {});
    await queryInterface.bulkDelete('Maps', null, {});
    await queryInterface.bulkDelete('Teams', null, {});
    await queryInterface.bulkDelete('Members', null, {});
    await queryInterface.bulkDelete('Matches', null, {});
    await queryInterface.bulkDelete('Meetings', null, {});
    await queryInterface.bulkDelete('MeetingTeams', null, {});
  },
};
