const { writeFile, readFile } = require('./file-utils');

const STATE_FILE_NAME = "./test/state.json";

function saveCompletionState(tasks) {
  let completedTaskNames = tasks
    .filter(task => task.completed)
    .map(task => task.name);

  writeStateData(completedTaskNames);
}
function writeStateData(stateData) {
  writeFile(STATE_FILE_NAME, JSON.stringify(stateData));
}



function markEarlierSuccessAsCompleted(tasks) {
  let state = readStateData();
  return tasks.map(task =>
    Object.assign({}, task, {
      completed: wasCompleted(task, state)
    }));
}
function readStateData() {
  try {
    return JSON.parse(readFile(STATE_FILE_NAME));
  } catch(error) {
    console.log("No state file found, must be a fresh repo.");
  }
  return [];
}
function wasCompleted(task, state) {
  return state.some(taskState => task.name === taskState)
}



function markSuccessAsCompleted(tasks) {
  return tasks.map(task =>
    Object.assign({}, task, { completed: !task.failed })
  );
}



module.exports = {
  saveCompletionState,
  markEarlierSuccessAsCompleted,
  markSuccessAsCompleted
};