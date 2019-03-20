function htmlize(tasks) {
  return injectIntoResultFileTemplate(
    tasks.map(taskToHtml).join("")
  );
}


function taskToHtml(task) {
  let testHtmls = task.tests.map(testToHtml);
  let completed = isCompleted(task);
  let failed = completed ? '' : isFailed(task);
  let pending = isPending(task);
  return `
    <li class="task ${completed} ${pending} ${failed}">
      <span class="task__title">${task.title}</span>
      <div class="task__description">${task.description}</div>
      <span class="task__tests__title">Test results: </span>
      <ul class="task__tests">
        ${testHtmls.join("")}
      </ul>
    </li>
  `;
}

let isCompleted = ifPropReturnClass('completed');
let isPending = ifPropReturnClass('pending');
let isFailed = ifPropReturnClass('failed');

function ifPropReturnClass(prop) {
  return ifPropReturn(prop, prop);
}
function ifPropReturn(prop, result) {
  return function(o) {
    return o[prop] ? result : '';
  }
}


function testToHtml(test) {
  return `
    <li class="task__tests__test ${test.failed ? 'failed' : 'passed'}">${test.title}</li>
  `;
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


module.exports = {
  htmlize
};