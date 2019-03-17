function taskToHtml(task) {
  let testHtmls = task.tests.map(testToHtml);
  return `
    <li class="task ${task.failed ? 'failed' : 'passed'} ${task.pending ? 'pending' : ''}">
      <span class="task__title">${task.title}</span>
      <div class="task__description">${task.description}</div>
      <span class="task__tests__title">Test results: </span>
      <ul class="task__tests">
        ${testHtmls.join("")}
      </ul>
    </li>
  `;
}

function testToHtml(test) {
  return `
    <li class="task__tests__test ${test.failed ? 'failed' : 'passed'}">${test.title}</li>
  `;
}

module.exports = {
  taskToHtml
};