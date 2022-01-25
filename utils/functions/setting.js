const models = require('../../database/models/index.js');
const Setting = models.Setting;

module.exports = (client) => {
  client.getSetting = async (name) => {
    try {
      const setting = await Setting.findOne({ where: { name } });
      if (setting && setting.key_int !== null) return setting.key_int;
      if (setting && setting.key_string !== null) return setting.key_string;
    } catch (error) {
      console.log(error);
    }
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
        where: { name: 'permissions' },
      });
      let boolValue;
      if (/true/i.test(isPermissionString)) boolValue = true;
      if (/false/i.test(isPermissionString)) boolValue = false;
      if (boolValue) {
        await permission.update({ key_int: 1 });
        return 'Les participants ont désormais accès aux commandes';
      } else {
        await permission.update({ key_int: 0 });
        return "Les participants n'ont désormais plus accès aux commandes";
      }
    } catch (error) {
      return "Erreur, la permission n'a pas été modifiée";
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

  client.updateBO = async (newBO) => {
    try {
      const BO = await Setting.findOne({ where: { name: 'default_BO' } });
      await BO.update({ key_int: newBO });
      return 'Le BO par défaut a été modifié';
    } catch (error) {
      console.log(error);
    }
  };

  client.updateCheckinTimer = async (newCheckin) => {
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
