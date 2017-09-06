import { Action, combineReducers } from 'redux';
import { Todo } from '../Types/TodoStore';
import { todo } from './todo';
export type KnownAction = AddTooAction | ToggleTodoAction;

interface AddTooAction {
    type: 'ADD_TODO',
    id: number,
    text: string,
}
interface ToggleTodoAction {
    type: 'TOGGLE_TODO',
    id: number,
}

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

const getAllTodos = (state: any) => state.allIds.map((id: any) => state.byId[id]);

export const getVisibileFilter = (state: any, filter: string) => {
    const allTodos = getAllTodos(state);
    switch (filter) {
        case 'all':
            return allTodos;
        case 'completed':
            return allTodos.filter((t: Todo) => t.completed);
        case 'active':
            return allTodos.filter((t: Todo) => !t.completed);
    }
    return allTodos;
};
