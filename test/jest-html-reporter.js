const { parseJestResult } = require('./utils/jest-result-parser');

class JestSummaryReporter {
  constructor(globalConfig, options) {
    this.globalConfig = globalConfig;
    this.options = options;
  }

  onRunComplete(contexts, results) {
    let output = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <title>Test results</title>
      </head>
      <body>
      <div>${results}</div>
      </body>
      </html>
    `;

    console.log(JSON.stringify(parseJestResult(results), "", "  "));

    // fs.writeFile("./test/index.html", output, function(err) {
    //   if(err) {
    //     return console.log(err);
    //   }
    //
    //   console.log("\n\nThe file was saved!");
    // });
  }
}


function prep(results) {
  jestResults.testResults
    .sort(bySuiteFileName)
}

function bySuiteFileName(a, b) {
    return a.fullPath < b.fullPath;
}

module.exports = JestSummaryReporter;