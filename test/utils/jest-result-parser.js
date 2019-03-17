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
  return tests[0].ancestorTitles[0];
}

function taskDescription(name) {
  return readFile(`./test/descriptions/${name}.html`);
}

function toFileName(pathString) {
  let path = processFullPath(pathString);
  return path.file.match(/(.*?)\./)[1];
}

function toTestResult(jestTestResult) {
  return {
    failed: jestTestResult.status === 'failed',
    title: jestTestResult.title,
    ancestorTitles: jestTestResult.ancestorTitles
  }
}

function testResults(jestSuite) {
  return jestSuite.testResults.map(toTestResult);
}

function suiteFailed(suite) {
  return suite.numFailingTests > 0 || suite.failureMessage || false;
}



module.exports = {
  parseJestResults
};