const models = require('../../database/models/index.js');
const Team = models.Team;

module.exports = (client) => {
  client.getTeam = async (key, value) => {
    //By Name, by Id or by role
    try {
      const team = await Team.findOne({ where: { [key]: value } });
      return team;
    } catch (error) {
      console.error(error);
    }
  };

  client.getTeams = async () => {
    try {
      const teams = await Team.findAll();
      if (teams && teams.length != 0) return teams;
    } catch (error) {
      console.error(error);
    }
  };

  client.addTeam = async (teamName, teamRole) => {
    try {
      await Team.create({
        name: teamName,
        roleId: teamRole,
      });
      return "L'équipe a été créée";
    } catch (error) {
      return "Erreur, l'équipe n'a pas été ajoutée";
    }
  };

  client.removeTeam = async (roleId) => {
    try {
      const team = await Team.findOne({ where: { roleId } });
      // Les membres sont supprimés en cascade
      await team.destroy();
      return team;
    } catch (error) {
      console.error(error);
    }
  };

  client.removeTeams = async () => {
    try {
      const teams = await Team.findAll();
      teams.forEach(async (team) => {
        await team.destroy();
      });
    } catch (error) {
      console.error(error);
    }
  };
};
