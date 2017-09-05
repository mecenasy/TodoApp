// import { v4 } from 'node-uuid';
import { Action, combineReducers } from 'redux';
import { Todo } from '../Types/TodoStore';

type KnownAction = AddTooAction | ToggleTodoAction;

interface AddTooAction {
    type: 'ADD_TODO',
    id: number,
    text: string,
}
interface ToggleTodoAction {
    type: 'TOGGLE_TODO',
    id: number,
}

const todo = (action: Action, state: Todo) => {
    const incomingAction = action as KnownAction;
    switch (incomingAction.type) {
        case 'ADD_TODO':
            return {
                completed: false,
                id: incomingAction.id,
                text: incomingAction.text,
            };
        case 'TOGGLE_TODO':
            if (state.id !== incomingAction.id) {
                return state;
            }
            return { ...state, completed: !state.completed };
        default:
            return state;
    }
};

const byId = (state: any, action: Action) => {
    const incomingAction = action as KnownAction;
    if (state === undefined) {
        state = {};
    }
    console.log(incomingAction);
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
    const incomingAction = action as KnownAction;
    if (state === undefined) {
        state = [];
    }
    console.log(incomingAction);
    switch (action.type) {
        case 'ADD_TODO':
            return [...state, incomingAction.id];
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
