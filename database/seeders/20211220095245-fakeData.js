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
        name: 'dust II',
      },
      {
        name: 'vertigo',
      },
      {
        name: 'ancient',
      },
    ]);
    await queryInterface.bulkInsert('Teams', [
      {
        name: 'Vitality',
        roleId: 'fake7897984654',
      },
      {
        name: 'G2',
        roleId: 'fake1235449849',
      },
      {
        name: 'Astralis',
        roleId: 'fake178678',
      },
      {
        name: 'DBL Poney',
        roleId: 'fake1453730',
      },
      {
        name: 'NAVI',
        roleId: 'fake7037350434',
      },
      {
        name: 'Gambit',
        roleId: 'fake04534143',
      },
      {
        name: 'NIP',
        roleId: 'fake307863750',
      },
      {
        name: 'Heroic',
        roleId: 'fake70837860241',
      },
      {
        name: 'Virtus.pro',
        roleId: 'fake783453010',
      },
      {
        name: 'Liquid',
        roleId: 'fake179210402',
      },
      {
        name: 'FaZe',
        roleId: 'fake7506412798',
      },
      {
        name: 'BIG',
        roleId: 'fake740719804',
      },
      {
        name: 'ENCE',
        roleId: 'fake795079126',
      },
      {
        name: 'GodSent',
        roleId: 'fake9814054512',
      },
      {
        name: 'OG',
        roleId: 'fake472301765',
      },
      {
        name: 'Blink',
        roleId: 'fake7405176841',
      },
    ]);
    for (let y = 1; y <= 16; y++) {
      for (let i = 1; i <= 5; i++) {
        await queryInterface.bulkInsert('Members', [
          {
            memberId: `fake${Math.floor(Math.random() * 1000000)}`,
            name: `Membre${y}.${i}`,
            isLeader: i === 1 ? 1 : 0,
            teams_id: y,
          },
        ]);
      }
    }
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Admins', null, {});
    await queryInterface.bulkDelete('Ips', null, {});
    await queryInterface.bulkDelete('Streams', null, {});
    await queryInterface.bulkDelete('Maps', null, {});
    await queryInterface.bulkDelete('Teams', null, {});
    await queryInterface.bulkDelete('Members', null, {});
    await queryInterface.bulkDelete('Matches', null, {});
    await queryInterface.bulkDelete('MatchTeams', null, {});
  },
};
