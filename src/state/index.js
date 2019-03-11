import {combineReducers} from 'redux';
import { createAction } from 'redux-actions';
import {listReducer} from './lists';
import {tasksReducer} from './tasks';
import {paramsToChangeStatusToDoReducer} from './paramsToChangeStatus';

export const INIT_APP = 'app:init';

export const rootReducer = combineReducers({
    lists: listReducer,
    tasks: tasksReducer,
    paramsToChangeStatus: paramsToChangeStatusToDoReducer
});

export const initApp = createAction(INIT_APP);