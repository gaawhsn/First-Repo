import { takeEvery, call, put } from 'redux-saga/effects';
import {
  ADD_TASK,
  ADD_TASK_SUCCESS,
  EDIT_TASK,
  REMOVE_TASK,
  REMOVE_TASK_SUCCESS,
  FETCH_TASKS,
  EDIT_TASK_WORKER,
  CREATE_TASK_SUCCESS,
  addTaskSuccess,
  createTaskFailure,
  editTaskNameSuccess,
  editTaskWorkerSuccess,
  fetchTasksSuccess,
  removeTaskSuccess
} from './index.js';
import { createTask, changeTitle, changeWorker, removeTask, fetchTasks } from '../../api/tasks.js';

export default function* () {
  yield takeEvery(FETCH_TASKS, onFetchAllTasks);
  yield takeEvery(ADD_TASK, onCreatingTask);
  yield takeEvery(EDIT_TASK, onChangeTaskName);
  yield takeEvery(REMOVE_TASK, onRemoveTask);
  yield takeEvery(EDIT_TASK_WORKER, onChangeWorker);
};

function* onFetchAllTasks(action) {
  try {
    const response = yield call(fetchTasks);
    yield put(fetchTasksSuccess(response));
  } catch(e) {

  }
}

function* onCreatingTask(action) {
  const { payload } = action;
  try {
    const response = yield call(createTask, payload);
    yield put(addTaskSuccess(response));
  }
  catch (error) {

  }
};

function* onChangeTaskName(action) {
  const { payload } = action;
  try {
    const response = yield call(changeTitle, payload);
    yield put(editTaskNameSuccess(response));
  }
  catch (error) {

  }
};

function* onChangeWorker(action) {
  const { payload } = action;
  try {
    const response = yield call(changeWorker, payload);
    yield put(editTaskWorkerSuccess(response))
  }
  catch (error) {

  }
};

function* onRemoveTask(action) {
  const { payload } = action;
  try {
    const response = yield call(removeTask, payload);
    yield put(removeTaskSuccess(response));
  }
  catch (error) {
    
  }
};
