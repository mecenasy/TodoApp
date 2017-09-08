import { combineReducers } from 'redux';
import { ReciveTodosAction, RequestTodosAction } from '../Action/IAction';
type KnowAction = ReciveTodosAction | RequestTodosAction;

export const createList = (filter: string) => {
    const ids = (state = [], action: KnowAction) => {
        if (action.filter !== filter) {
            return state;
        }
        switch (action.type) {
            case 'RECEIVE_TODOS':
                return action.response.map((todo) => todo.id);
            default:
                return state;
        }
    };
    const isFatching = (state = false, action: KnowAction) => {
        if (action.filter !== filter) {
            return state;
        }
        switch (action.type) {
            case 'RECEIVE_TODOS':
                return false;
            case 'REQUEST_TODOS':
                return true;
            default:
                return state;
        }
    };
    return combineReducers({
        ids,
        isFatching,
    });
};

export const getIds = (state: any) => state.ids;

export const getIsFetching = (state: any) => state.isFatching;
