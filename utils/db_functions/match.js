const models = require('../../database/models/index.js');
const Match = models.Match;

module.exports = (client) => {
  client.getMatch = async (id) => {
    try {
      const match = await Match.findOne({ where: { id } });
      return match;
    } catch (error) {
      console.error(error);
    }
  };

  client.getMatches = async () => {
    try {
      const matches = await Match.findAll();
      return matches;
    } catch (error) {
      console.error(error);
    }
  };

  client.addMatch = async (subId, meetings_id) => {
    try {
      await Match.create({ subId, meetings_id, status: 'waiting' });
    } catch (error) {
      console.error(error);
    }
  };

  client.updateMatch = async (id, key, value) => {
    try {
      const match = await client.getMatch(id);
      await match.update({ [key]: value });
    } catch (error) {
      console.error(error);
    }
  };

  client.removeMatch = async (id) => {
    try {
      const match = await client.getMatch(id);
      await match.destroy();
    } catch (error) {
      console.error(error);
    }
  };
};
