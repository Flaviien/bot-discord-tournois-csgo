const models = require('../../database/models/index.js');
const Map = models.Map;

module.exports = (client) => {
  client.getMap = async (name) => {
    try {
      const map = await Map.findOne({ where: { name } });
      return map;
    } catch (error) {
      console.error(error);
    }
  };

  client.getMaps = async () => {
    try {
      const maps = await Map.findAll();
      return maps;
    } catch (error) {
      console.error(error);
    }
  };
};
