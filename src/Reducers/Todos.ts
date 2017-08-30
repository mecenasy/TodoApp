import { Action } from 'redux';
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
                id: incomingAction.id,
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

export const todos = (state: Todo[], action: Action) => {
    const incomingAction = action as KnownAction;
    if (state === undefined) {
        state = [];
    }
    switch (incomingAction.type) {
        case 'ADD_TODO': {
            const el = todo(action);
            if (el !== undefined) {
                return [...state, el];
            }
            return state;
        }
        case 'TOGGLE_TODO':
            return state.map((t) => todo(incomingAction, t));
        default: {

            return state;
        }
    }
};
