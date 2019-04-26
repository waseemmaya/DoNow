const initial_state = {
  user: null,
  tasks: []
};

const reducer = (state = initial_state, action) => {
  switch (action.type) {
    case "ADD_TASK": {
      const { tasks } = state;
      return { ...state, tasks: [action.task, ...tasks] };
    }
    case "UPDATE_TASK": {
      let i = action.index;
      let newArr = [...state.tasks];
      newArr[i].task.taskName = action.task.taskName;
      newArr[i].task.isEdit = action.task.isEdit;
      newArr[i].task.editDate = action.task.editDate;
      return { ...state, tasks: newArr };
    }

    case "RESTORE_BACKUP": {
      let newArr = action.newArr;
      console.log("newArr===>", newArr);

      return { ...state, tasks: newArr };
    }

    case "REMOVE_TASK": {
      var { tasks } = state;
      let i = action.index;
      let newArr = [];
      tasks.map((v, j) => {
        if (i !== j) {
          newArr.push(v);
        }
        return newArr;
      });
      return { ...state, tasks: newArr };
    }
    default: {
      return state;
    }
  }
};

export default reducer;
