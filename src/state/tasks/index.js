import uuid from 'uuid';
import { handleActions, createAction } from 'redux-actions';

export const FETCH_TASKS = 'tasks: fetch-tasks';
export const FETCH_TASKS_SUCCESS = 'tasks: fetch-tasks-success';
export const FETCH_TASKS_FAILURE = 'tasks: fetch-tasks-failure';
export const ADD_TASK = 'tasks: add-task';
export const ADD_TASK_SUCCESS = 'tasks: add-task-success';
export const REMOVE_TASK = 'tasks: remove-task';
export const REMOVE_TASK_SUCCESS = 'tasks: remove-task-success';
export const EDIT_TASK = 'tasks: edit-task';
export const EDIT_TASK_NAME_SUCCESS = 'tasks: edit-task-success';
const SET_TASK_STATUS = 'tasks: set-task-status';
export const EDIT_TASK_WORKER = 'tasks: edit-worker';
export const EDIT_TASK_WORKER_SUCCESS = 'tasks: edit-task-worker-success';

const initialState = { tasks: [] };

export const tasksReducer = handleActions({

  [ADD_TASK_SUCCESS]: (state, { payload }) => ({
    ...state,
    tasks: [...state.tasks, payload]
  }),

  [FETCH_TASKS_SUCCESS]: (state, { payload }) => ({
    ...state,
    tasks: payload
  }),

  [REMOVE_TASK_SUCCESS]: (state, { payload }) => ({
    ...state,
    tasks: state.tasks.filter(task => (task.id !== payload.id))
  }),

  [EDIT_TASK_NAME_SUCCESS]: (state, { payload }) => ({
    ...state,
    tasks: state.tasks.map(task => task.id === payload.id ? { ...task, taskName: payload.taskName } : task)
  }),

  [SET_TASK_STATUS]: (state, { payload }) => {
    state.filter(state => state.id === payload.id)
      .map(state => state.status = payload.status)
    state.filter(state => state.id === payload.id)
      .map(state => state.idOfList = payload.idOfList)
    return [...state];
  },

  [EDIT_TASK_WORKER_SUCCESS]: (state, { payload }) => ({
    ...state,
    tasks: state.tasks.map(task => task.id === payload.id ? { ...task, worker: payload.worker } : task)
  })
}, initialState);

export const fetchTasks = createAction(FETCH_TASKS);
export const fetchTasksSuccess = createAction(FETCH_TASKS_SUCCESS);
export const fetchTasksFailure = createAction(FETCH_TASKS_FAILURE);

export const createNewTask = (taskName = 'undefined task', idOfList, worker) => ({
  type: ADD_TASK,
  payload: {
    id: uuid(),
    taskName,
    idOfList,
    status: "Tasks to do",
    worker
  }
});

export const addTaskSuccess = (payload) => ({
  type: ADD_TASK_SUCCESS,
  payload
});

export const removeTask = (taskId) => ({
  type: REMOVE_TASK,
  payload: {
    taskId
  }
});

export const removeTaskSuccess = ({ id }) => ({
  type: REMOVE_TASK_SUCCESS,
  payload: {
    id
  }
});

export const editTask = (taskName, id) => ({
  type: EDIT_TASK,
  payload: {
    taskName,
    id
  }
});

export const editTaskNameSuccess = createAction(EDIT_TASK_NAME_SUCCESS)

export const setTaskStatus = (idOfList, id, status) => ({
  type: SET_TASK_STATUS,
  payload: {
    idOfList,
    id,
    status
  }
});

export const editTaskWorker = (id, worker) => ({
  type: EDIT_TASK_WORKER,
  payload: {
    id,
    worker
  }
});

export const editTaskWorkerSuccess = (payload) => ({
  type: EDIT_TASK_WORKER_SUCCESS,
  payload
});
