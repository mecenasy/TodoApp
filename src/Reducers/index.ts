import { combineReducers } from 'redux';
import { byId, getTodo } from './byId';
import * as fromList from './createList';

const listByFilter = combineReducers({
    active: fromList.createList('active'),
    all: fromList.createList('all'),
    completed: fromList.createList('completed'),
});

export const todos = combineReducers({ byId, listByFilter });

export const getVisibileFilter = (state: any, filter: string) => {
    const ids = fromList.getIds(state.listByFilter[filter]);
    return ids.map((id: any) => getTodo(state.byId, id));
};

export const getIsFetching = (state: any, filter: string) => fromList.gerIsFetching(state.listByFilter[filter]);
