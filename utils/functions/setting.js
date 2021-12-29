const models = require('../../database/models/index.js');
const Setting = models.Setting;

module.exports = (client) => {
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

  client.getNbrTeams = async () => {
    try {
      const nbrTeams = await Setting.findOne({ where: { name: 'nbr_teams' } });
      if (nbrTeams) return nbrTeams.key_int;
    } catch (error) {
      console.log(error);
    }
  };

  client.updateNbrTeams = async (newNbrTeams) => {
    try {
      const nbrTeams = await Setting.findOne({ where: { name: 'nbr_teams' } });
      await nbrTeams.update({ key_int: newNbrTeams });
      return "Le nombre d'équipe a été modifié";
    } catch (error) {
      console.log(error);
    }
  };

  client.updateCheckin = async (newCheckin) => {
    try {
      const checkin = await Setting.findOne({
        where: { name: 'checkin_time' },
      });
      await checkin.update({ key_int: newCheckin });
      return 'Le checkin a été modifié';
    } catch (error) {
      return "Erreur, le checkin n'a pas été modifié";
    }
  };

  client.updateVeto = async (isVetoString) => {
    try {
      const veto = await Setting.findOne({
        where: { name: 'veto' },
      });
      let boolValue;
      if (/true/i.test(isVetoString)) boolValue = true;
      if (/false/i.test(isVetoString)) boolValue = false;
      await veto.update({ key_int: boolValue ? 1 : 0 });
      return 'La veto a été modifiée';
    } catch (error) {
      return "Erreur, la veto n'a pas été modifiée";
    }
  };
};
