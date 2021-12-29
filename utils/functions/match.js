const models = require('../../database/models/index.js');
const Match = models.Match;

module.exports = (client) => {
  client.getMatches = async () => {
    try {
      const matches = await Match.findAll();
      return matches;
    } catch (error) {
      console.log(error);
    }
  };

  client.addMatch = async (matchId, teams_id_1, teams_id_2, isIngame = 0) => {
    try {
      await Match.create({ matchId, teams_id_1, teams_id_2, isIngame });
    } catch (error) {
      console.log(error);
    }
  };

  client.removeMatches = async () => {
    try {
      const matches = await Match.findAll();
      matches.forEach(async (match) => {
        await match.destroy();
      });
    } catch (error) {
      console.log(error);
    }
  };
};
