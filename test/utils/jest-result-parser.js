const { readFile } = require('./file-utils');
const { processFullPath } = require('./path-utils');



function parseJestResults(jestResult) {
  return jestResult.testResults
    .map(toSuiteResult)
}

function toSuiteResult(jestSuite) {
  let name = toFileName(jestSuite.testFilePath);
  let tests = testResults(jestSuite);
  return {
    name,
    title: taskTitle(tests),
    description: taskDescription(name),
    failed: suiteFailed(jestSuite),
    tests
  }
}

function taskTitle(tests) {
  if (tests.length > 0) {
    return tests[0].ancestorTitles[0];
  }
  return "";
}

function taskDescription(name) {
  return readFile(`./test/descriptions/${name}.html`);
}

function toFileName(pathString) {
  let path = processFullPath(pathString);
  return path.file.match(/(.*?)\./)[1];
}


function testResults(jestSuite) {
  return jestSuite.testResults.map(toTestResult);
}

function toTestResult(jestTestResult) {
  return {
    failed: jestTestResult.status === 'failed',
    title: jestTestResult.title,
    ancestorTitles: jestTestResult.ancestorTitles
  }
}


function suiteFailed(suite) {
  return Boolean(suite.numFailingTests > 0 || suite.failureMessage);
}



module.exports = {
  parseJestResults
};