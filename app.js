const webserver = require('./app/webserver');
const db = require('./app/db');

function run() {
  webserver.run();
  db.run();
}

module.exports = { run };