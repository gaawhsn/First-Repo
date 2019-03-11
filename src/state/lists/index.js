import uuid from 'uuid';
import { handleActions, createAction } from 'redux-actions';

const initialState = { lists: [] };

export const ADD_LIST = 'list: create-new-list';
export const ADD_LIST_SUCCESS = 'list: create-new-list-success';
const ADD_LIST_FAILURE = 'list: create-new-list-failure';
export const FETCH_LISTS = 'lists: fetch-lists';
export const FETCH_LISTS_SUCCESS = 'lists: fetch-lists-success';
export const REMOVE_LIST = 'list: remove-list';
export const REMOVE_LIST_SUCCESS = 'list: remove-list-success';
const REMOVE_LIST_FAILURE = 'list: remove-list-failure';
export const EDIT_LIST_TITLE = 'list: edit-list-title';
export const EDIT_LIST_TITLE_SUCCESS = 'list: edit-list-title-success';
export const EDIT_LIST_TITLE_FAILURE = 'list: edit-list-title-failure';


export const listReducer = handleActions({

  [ADD_LIST_SUCCESS]: (state, { payload }) => ({
    ...state,
    lists: [...state.lists, payload]
  }),

  [EDIT_LIST_TITLE_SUCCESS]: (state, { payload }) => ({
    ...state,
    lists: state.lists.map(list => list.id === payload.id ? { ...list, title: payload.title } : list)
  }),

  [FETCH_LISTS_SUCCESS]: (state, { payload }) => ({
    ...state,
    lists: payload
  })
}, initialState);


export const createNewList = (title = "tasks to do", owner = "anonymous", day, month, year) => ({
  type: ADD_LIST,
  payload: {
    id: uuid(),
    title,
    owner,
    day,
    month,
    year
  }
});

export const addListsSuccess = (payload) => ({
  type: ADD_LIST_SUCCESS,
  payload
});

export const fetchLists = createAction(FETCH_LISTS);
export const createNewListFailure = createAction(ADD_LIST_FAILURE);
export const removeListFailure = createAction(REMOVE_LIST_FAILURE);
export const editListTitleFailure = createAction(EDIT_LIST_TITLE_FAILURE);
export const fetchListsSuccess = createAction(FETCH_LISTS_SUCCESS);
export const editListTitleSuccess = createAction(EDIT_LIST_TITLE_SUCCESS);

export const editListTitle = (title = "tasks to do", id) => ({
  type: EDIT_LIST_TITLE,
  payload: {
    title,
    id
  }
});

export const removeList = (id) => ({
  type: REMOVE_LIST,
  payload: {
    id
  }
});

export const removeListSuccess = (idToRemoveList) => ({
  type: REMOVE_LIST_SUCCESS,
  payload: {
    idToRemoveList
  }
});
