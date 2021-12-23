const models = require('../database/models/index.js');
const Setting = models.Setting;
const Stream = models.Stream;
const Team = models.Team;
const Member = models.Member;

module.exports = (client) => {
  /*SETTINGS*/
  client.getPrefix = async () => {
    const prefix = await Setting.findOne({ where: { name: 'prefix' } });
    if (prefix) return prefix.key_string;
    return client.config.DEFAULTSETTINGS.prefix;
  };

  client.updatePrefix = async (newPrefix) => {
    try {
      const prefix = await Setting.findOne({ where: { name: 'prefix' } });
      await prefix.update({ key_string: newPrefix });
      return 'Le prefix a été modifié';
    } catch (error) {
      return "Erreur, le prefix n'a pas été modifié";
    }
  };

  client.updatePermission = async (isPermissionString) => {
    try {
      const permission = await Setting.findOne({
        where: { name: 'permission' },
      });
      let boolValue;
      if (/true/i.test(isPermissionString)) boolValue = true;
      if (/false/i.test(isPermissionString)) boolValue = false;
      await permission.update({ key_int: boolValue ? 1 : 0 });
      return 'La permission a été modifiée';
    } catch (error) {
      return "Erreur, la permission n'a pas été modifiée";
    }
  };

  /*TEAMS*/
  /* client.getTeam = async (teamName) => {
    const team = await Team.findOne({ where: { name: teamName } });
  }; */

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
      await client.removeMembers(team);
      await team.destroy();
      return teamRoleId;
    } catch (error) {
      console.log(error);
    }
  };

  /*MEMBERS*/

  client.addMember = async (teamName, memberName, isLeader) => {
    const team = await Team.findOne({ where: { name: teamName } });
    try {
      await Member.create({
        name: memberName,
        leader: isLeader ? 1 : 0,
        teams_id: team.id,
      });
    } catch (error) {
      console.log(error);
    }
  };

  client.removeMembers = async (team) => {
    const members = await Member.findAll({ where: { teams_id: team.id } });
    members.forEach(async (member) => {
      await member.destroy();
    });
  };

  /*STREAMS*/
  client.getStreams = async () => {
    const streams = await Stream.findAll();
    if (streams && streams.length != 0) return streams;
    return 'Aucun stream en cours';
  };

  client.addStream = async (name, url) => {
    try {
      await Stream.create({ name, url });
      return 'Le stream a été créé';
    } catch (error) {
      return "Erreur, le stream n'a pas été ajouté";
    }
  };

  client.updateStream = async (name, url) => {
    try {
      const stream = await Stream.findOne({ where: { name } });
      await stream.update({ name, url });
      return 'Le stream a été modifié';
    } catch (error) {
      return "L'utilisateur n'a pas été trouvé, le stream n'a pas été modifié";
    }
  };

  client.removeStream = async (name) => {
    try {
      const stream = await Stream.findOne({ where: { name } });
      await stream.destroy();
      return 'Le stream a été supprimé';
    } catch (error) {
      return "L'utilisateur n'a pas été trouvé, le stream n'a pas été supprimé";
    }
  };
};
