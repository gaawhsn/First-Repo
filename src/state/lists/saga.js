import { delay } from 'redux-saga';
import { takeEvery, call, put } from 'redux-saga/effects';
import {
  ADD_LIST,
  ADD_LIST_SUCCESS,
  REMOVE_LIST,
  REMOVE_LIST_SUCCESS,
  EDIT_LIST_TITLE,
  EDIT_LIST_TITLE_SUCCESS,
  addListsSuccess,
  createNewListSuccess,
  createNewListFailure,
  fetchListsSuccess,
  removeListSuccess,
  removeListFailure,
  editListTitleSuccess,
  editListTitleFailure,
  FETCH_LISTS
} from './index.js';
import { INIT_APP } from '../index.js';
import { fetchLists, addLists, removeList, changeTitle } from '../../api/lists.js';

export default function* () {
  yield takeEvery(INIT_APP, onFetchAllLists);
  yield takeEvery(FETCH_LISTS, onFetchAllLists);
  yield takeEvery(ADD_LIST, onAddLists);
  //yield takeEvery(ADD_LIST_SUCCESS, onFetchAllLists);
  yield takeEvery(REMOVE_LIST_SUCCESS, onFetchAllLists);
  yield takeEvery(REMOVE_LIST, onListRemove);
  yield takeEvery(EDIT_LIST_TITLE, onEditListTitle);
  //yield takeEvery(EDIT_LIST_TITLE_SUCCESS, onFetchAllLists);
}

function* onInit() {
  while (true) {
    yield put(fetchLists());
  }
}

function* onFetchAllLists() {
  try {
    const lists = yield call(fetchLists);
    console.log(lists);
    yield put(fetchListsSuccess(lists));
  } catch (e) {

  }
}

function* onEditListTitle(action) {
  const { payload } = action;
  try {
    const response = yield call(changeTitle, payload);
    console.log(response);
    yield put(editListTitleSuccess(response));
  }
  catch (error) {
    yield put(editListTitleFailure('List title was not change'));
  }
}

function* onListRemove(action) {
  const { payload } = action;
  try {
    const response = yield call(removeList, payload);
    yield put(removeListSuccess());
  } catch (error) {
    yield put(removeListFailure('List was not removed'))
  }
}

function* onAddLists(action) {
  const { payload } = action;
  try {
    const response = yield call(addLists, payload);
    console.log(response);
    yield put(addListsSuccess(response));
    //yield takeEvery(ADD_LIST_SUCCESS, onFetchAllLists);
  } catch (error) {
    yield put(createNewListFailure('Problem while creating list'));
  }
};
