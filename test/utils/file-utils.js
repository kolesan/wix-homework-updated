const fs = require('fs');

function readFile(name) {
  return fs.readFileSync(name, 'utf8');
}

function writeFile(name, contents) {
  fs.writeFile(name, contents, function(err) {
    if(err) {
      console.log("Error while trying to write test results to file.");
    }
  });
}

module.exports = {
  readFile,
  writeFile
};
