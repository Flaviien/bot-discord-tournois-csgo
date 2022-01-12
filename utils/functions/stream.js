const models = require('../../database/models/index.js');
const Stream = models.Stream;

module.exports = (client) => {
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

  /* client.updateStream = async (name, url) => {
    try {
      const stream = await Stream.findOne({ where: { name } });
      await stream.update({ name, url });
      return 'Le stream a été modifié';
    } catch (error) {
      return "L'utilisateur n'a pas été trouvé, le stream n'a pas été modifié";
    }
  }; */

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
