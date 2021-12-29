const models = require('../../database/models/index.js');
const Team = models.Team;

module.exports = (client) => {
  client.getTeam = async (teamName) => {
    const team = await Team.findOne({ where: { name: teamName } });
    return team;
  };

  client.getTeams = async () => {
    try {
      const teams = await Team.findAll();
      if (teams && teams.length != 0) return teams;
    } catch (error) {
      console.log(error);
    }
  };

  client.addTeam = async (teamName, teamRole) => {
    try {
      await Team.create({ name: teamName, roleId: teamRole });
      return "L'équipe a été créée";
    } catch (error) {
      return "Erreur, l'équipe n'a pas été ajoutée";
    }
  };

  client.removeTeam = async (teamMention) => {
    try {
      teamRoleId = teamMention.match(/\d+/g).join('');
      const team = await Team.findOne({ where: { roleId: teamRoleId } });
      // Inutile, car les membres sont supprimés en cascade:
      // await client.removeMembers(team);
      await team.destroy();
      return teamRoleId;
    } catch (error) {
      console.log(error);
    }
  };

  client.removeTeams = async () => {
    try {
      const teams = await Team.findAll();
      teams.forEach(async (team) => {
        await team.destroy();
      });
    } catch (error) {
      console.log(error);
    }
  };
};
