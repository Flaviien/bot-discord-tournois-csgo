module.exports.run = async (client, message, args) => {
  const teams = [
    'Vitality',
    'G2',
    'Astralis',
    'DBL Poney',
    'NAVI',
    'Gambit',
    'NIP',
    'Heroic',
    'Virtus.pro',
    'Liquid',
    'FaZe',
    'BIG',
    'ENCE',
    'GodSent',
    'OG',
    'Blink',
  ];
  for (let i = 0; i < teams.length; i++) {
    const role = await message.guild.roles.create({
      name: `${teams[i]}`,
      color: 'RANDOM',
    });

    await client.addTeam(teams[i], role.id);
  }
  for (let y = 1; y <= 16; y++) {
    for (let j = 1; j <= 5; j++) {
      let leader = false;
      if (j === 1) leader = true;
      await client.addMember(teams[y - 1], `fake${Math.floor(Math.random() * 1000000)}`, `Membre${y}.${j}`, leader);
    }
  }
};

module.exports.help = {
  name: 'fakeTeams',
  aliases: ['fakeTeams', 'ft'],
  category: 'Divers',
  description: 'Filling the DB with teams and his members - Help for development',
  cooldown: 10,
  usage: '',
  options: {},
  canAdminMention: false,
  isPermissionsRequired: true,
  isArgumentRequired: false,
  needUserMention: false,
  needRoleMention: false,
};
