import { createSelector } from 'reselect';

const selectListsRoot = (state) => state.lists;

export const selectLists = (state) => selectListsRoot(state).title;