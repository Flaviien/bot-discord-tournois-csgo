const models = require('../../database/models/index.js');
const Match = models.Match;

module.exports = (client) => {
  client.getMatch = async (matchId) => {
    try {
      const match = await Match.findOne({ where: { matchId } });
      return match;
    } catch (error) {
      console.log(error);
    }
  };

  client.getMatches = async () => {
    try {
      const matches = await Match.findAll();
      return matches;
    } catch (error) {
      console.log(error);
    }
  };

  client.addMatch = async (matchId, meetings_id) => {
    try {
      await Match.create({ matchId, meetings_id });
    } catch (error) {
      console.log(error);
    }
  };

  client.updateMatch = async (matchId, key, value) => {
    try {
      const match = await client.getMatch(matchId);
      await match.update({ [key]: value });
    } catch (error) {
      console.log(error);
    }
  };
};
