const models = require('../../database/models/index.js');
const Admin = models.Admin;

module.exports = (client) => {
  client.getAdmins = async (id) => {
    try {
      return await Admin.findAll();
    } catch (error) {
      console.error(error);
    }
  };

  client.addAdmin = async (id) => {
    try {
      return await Admin.create({
        id,
      });
    } catch (error) {
      console.error(error);
    }
  };

  client.removeAdmin = async (id) => {
    try {
      const admin = await Admin.findOne({ where: { id } });
      return await admin.destroy();
    } catch (error) {
      console.error(error);
    }
  };
};
