const addTask = task => {
  return {
    type: "ADD_TASK",
    task
  };
};

const updateTask = (i, task) => {
  return {
    type: "UPDATE_TASK",
    index: i,
    task: task
  };
};

const removeTask = (i, task) => {
  return {
    type: "REMOVE_TASK",
    index: i,
    task: task
  };
};

const restoreBackup = newArr => {
  return {
    type: "RESTORE_BACKUP",
    newArr: newArr
  };
};

export { removeTask, addTask, updateTask, restoreBackup };
