import { v4 } from 'node-uuid';
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

const todo = (action: Action, state?: Todo) => {
    const incomingAction = action as KnownAction;
    switch (incomingAction.type) {
        case 'ADD_TODO':
            return {
                completed: false,
                id: v4(),
                text: incomingAction.text,
            };
        case 'TOGGLE_TODO':
            if (state !== undefined) {
                if (state.id !== incomingAction.id) {
                    return state;
                }
                return { ...state, completed: !state.completed };
            }
            return state;
        default:
            return state;
    }
};

const byId = (state: any, action: Action) => {
    const incomingAction = action as KnownAction;
    if (state === undefined) {
        state = {};
    }
    switch (incomingAction.type) {
        case 'ADD_TODO':
        case 'TOGGLE_TODO': {
            const el = todo(action);
            if (el !== undefined) {
                return { ...state, [incomingAction.id]: todo(incomingAction, state[incomingAction.id]) };
            }
            return state;
        }
        default: {
            return state;
        }
    }
};
const allIds = (state: Todo[], action: Action) => {
    const incomingAction = action as KnownAction;
    switch (action.type) {
        case 'ADD_TODO':
            return [...state, incomingAction.id];
        default:
            return state;
    }
};

export const todos = combineReducers({byId, allIds});

export const getVisibileFilter = (state: Todo[], filter: string) => {
    switch (filter) {
        case 'all':
            return state;
        case 'completed':
            return state.filter((t: Todo) => t.completed);
        case 'active':
            return state.filter((t: Todo) => !t.completed);

    }
    return state;
};
