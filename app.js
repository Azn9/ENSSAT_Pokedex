const webserver = require('./app/webserver');
const db = require('./app/db');

// Run the webserver and the database
function run() {
  webserver.run();
  db.run();
}

// Export the run function
module.exports = {
  run
};