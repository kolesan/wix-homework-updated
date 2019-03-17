const fs = require('fs');

function readFile(name) {
  return fs.readFileSync(name, 'utf8');
}

module.exports = {
  readFile
};
