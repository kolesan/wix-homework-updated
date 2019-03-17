const { writeFile } = require('./utils/file-utils');
const { parseJestResults } = require('./utils/jest-result-parser');
const { taskToHtml } = require('./utils/task-htmlizer');

class JestSummaryReporter {
  constructor(globalConfig, options) {
    this.globalConfig = globalConfig;
    this.options = options;
  }

  onRunComplete(contexts, results) {
    let tasks = parseJestResults(results);
    // console.log(JSON.stringify(tasks, "", "  "));
    let preparedTasks = prep(tasks);
    let taskHtmls = preparedTasks.map(taskToHtml);
    let htmlizedTasks = taskHtmls.join("");
    let output = injectIntoResultFileTemplate(htmlizedTasks);

    writeFile("./test/index.html", output);
  }
}

function injectIntoResultFileTemplate(htmlizedTasks) {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <title>Test results</title>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Fira+Sans">
      <link rel="stylesheet" href="style.css">
    </head>
    <body>
      <ul class="tasks">
        ${htmlizedTasks}
      </ul>
    </body>
    </html>
  `;
}

function prep(tasks) {
  let sortedTasks = tasks.sort(byName);

  let lastPassingIndex = sortedTasks.findIndex(task => !task.failed);
  if (lastPassingIndex !== -1) {
    sortedTasks.slice(0, lastPassingIndex).forEach(task => task.failed = false);
  }
  let firstFailingIndex = sortedTasks.findIndex(task => task.failed);
  if (firstFailingIndex !== -1) {
    sortedTasks.slice(firstFailingIndex + 1).forEach(task => task.pending = true);
  }

  return sortedTasks;
}

function byName(a, b) {
    return a.name > b.name;
}

module.exports = JestSummaryReporter;