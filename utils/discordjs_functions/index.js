const fs = require('fs');
const path = require('path');
const basename = path.basename(__filename);

module.exports = (client) => {
  /*Require tout les fichiers du dossier courant (sauf ce fichier (index.js == basename))*/

  fs.readdirSync(__dirname)
    .filter((file) => {
      return file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js';
    })
    .forEach((file) => {
      require(`./${file}`)(client);
    });
};
