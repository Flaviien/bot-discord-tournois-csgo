const models = require('../../database/models/index.js');
const Match = models.Match;
const MatchTeams = models.MatchTeams;

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
      await Match.create({ matchId, isIngame });
      await MatchTeams.create({ matches_id: matchId, teams_id: teams_id_1 });
      await MatchTeams.create({ matches_id: matchId, teams_id: teams_id_2 });
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

  client.updateCheckin = async (matches_id) => {
    try {
      const matches = await MatchTeams.findAll({ where: { matches_id } });
      for (const match of matches) {
        await match.update({ checkin: 1 });
      }
    } catch (error) {
      console.log(error);
    }
  };
};
