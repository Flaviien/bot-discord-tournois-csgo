const models = require('../database/models/index.js');
const Setting = models.Setting;
const Stream = models.Stream;

module.exports = (client) => {
  /*SETTINGS*/
  client.getPrefix = async () => {
    const prefix = await Setting.findOne({ where: { name: 'prefix' } });
    if (prefix) return prefix.key_string;
    return client.config.DEFAULTSETTINGS.prefix;
  };

  client.updatePrefix = async (newValue) => {
    const prefix = await Setting.findOne({ where: { name: 'prefix' } });
    try {
      await prefix.update({ key_string: newValue });
      return 'Le prefix a été modifié';
    } catch (error) {
      return "Erreur, le prefix n'a pas été modifié";
    }
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
    const stream = await Stream.findOne({ where: { name } });
    try {
      await stream.update({ name, url });
      return 'Le stream a été modifié';
    } catch (error) {
      return "L'utilisateur n'a pas été trouvé, le stream n'a pas été modifié";
    }
  };

  client.removeStream = async (name) => {
    const stream = await Stream.findOne({ where: { name } });
    try {
      await stream.destroy({ name });
      return 'Le stream a été supprimé';
    } catch (error) {
      return "L'utilisateur n'a pas été trouvé, le stream n'a pas été supprimé";
    }
  };

  /*TEAMS*/
};
