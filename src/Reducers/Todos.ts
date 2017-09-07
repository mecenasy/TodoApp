import { Action, combineReducers } from 'redux';
import { AddTooAction, ToggleTodoAction } from '../Action/IAction';
import { Todo } from '../Types/TodoStore';
import { todo } from './todo';
export type KnownAction = AddTooAction | ToggleTodoAction;

const byId = (state: any, action: Action) => {
    const incomingAction = action as KnownAction;
    if (state === undefined) {
        state = {};
    }
    switch (incomingAction.type) {
        case 'ADD_TODO':
        case 'TOGGLE_TODO': {
            return { ...state, [incomingAction.id]: todo(incomingAction, state[incomingAction.id]) };
        }
        default: {
            return state;
        }
    }
};

const allIds = (state: any, action: Action) => {
    if (state === undefined) {
        state = [];
    }
    switch (action.type) {
        case 'ADD_TODO': {
            const index = state.length;
            return [...state, index];
        }
        default:
            return state;
    }
};

export const todos = combineReducers({ byId, allIds });

const getAllTodos = (state: any): Todo[] => state.allIds.map((id: number) => state.byId[id]);

export const getVisibileFilter = (state: any, filter: string) => {
    const allTodos = getAllTodos(state);
    switch (filter) {
        case 'all':
            return allTodos;
        case 'completed':
            return allTodos.filter((t: Todo) => t.completed);
        case 'active':
            return allTodos.filter((t: Todo) => !t.completed);
        default:
            throw new Error(`Unknow filter ${filter}`);
    }
};
