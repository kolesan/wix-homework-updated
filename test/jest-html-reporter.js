const { writeFile } = require('./utils/file-utils');
const { parseJestResults } = require('./utils/jest-result-parser');
const { htmlize } = require('./utils/task-htmlizer');
const { markEarlierSuccessAsCompleted,
  markSuccessAsCompleted, saveCompletionState
} = require('./utils/completion-state-manager');
const { pipe, curryLeft, tap } = require('../src/utils/functional-utils');

let writeResultFile = curryLeft(writeFile, "./test/index.html");

class JestSummaryReporter {
  constructor(globalConfig, options) {
    this.globalConfig = globalConfig;
    this.options = options;
  }

  onRunComplete(contexts, results) {
    pipe(results,
      parseJestResults,
      markSuccessAsCompleted,
      markEarlierSuccessAsCompleted,
      tap(saveCompletionState),
      sortTasksByName,
      htmlize,
      writeResultFile
    );
  }
}


function sortTasksByName(tasks) {
  let sortedTasks = [...tasks].sort(byName);

  // let lastPassingIndex = sortedTasks.findIndex(task => !task.failed);
  // if (lastPassingIndex !== -1) {
  //   sortedTasks.slice(0, lastPassingIndex).forEach(task => task.failed = false);
  // }
  // let firstFailingIndex = sortedTasks.findIndex(task => task.failed);
  // if (firstFailingIndex !== -1) {
  //   sortedTasks.slice(firstFailingIndex + 1).forEach(task => task.pending = true);
  // }

  return sortedTasks;
}

function byName(a, b) {
    return a.name > b.name;
}

module.exports = JestSummaryReporter;