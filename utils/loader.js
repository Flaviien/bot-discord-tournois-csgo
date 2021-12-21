const { readdirSync } = require('fs');

/**
 * Set chaque commande dans l'objet "client"
 * @param {Object} client
 * @param {string} dir
 */
const loadCommands = (client, dir = './commands/') => {
  readdirSync(dir).forEach((dirs) => {
    const commands = readdirSync(`${dir}/${dirs}/`).filter((files) =>
      files.endsWith('.js')
    );

    for (const file of commands) {
      const getFileName = require(`../${dir}/${dirs}/${file}`);
      client.commands.set(getFileName.help.name, getFileName);
    }
  });
};

/**
 * Set chaque event dans l'objet "client"
 * @param {Object} client
 * @param {string} dir
 */
const loadEvents = (client, dir = './events/') => {
  readdirSync(dir).forEach((dirs) => {
    const events = readdirSync(`${dir}/${dirs}/`).filter((files) =>
      files.endsWith('.js')
    );

    for (const event of events) {
      const evt = require(`../${dir}/${dirs}/${event}`);
      const evtName = event.split('.')[0];
      client.on(evtName, evt.bind(null, client));
    }
  });
};

module.exports = {
  loadCommands,
  loadEvents,
};
