
import { v4 } from 'node-uuid';
import { Action } from 'redux';
import { Todo } from '../Types/TodoStore';
import { KnownAction } from './Todos';

export const todo = (action: Action, state: Todo) => {
    const incomingAction = action as KnownAction;
    switch (incomingAction.type) {
        case 'ADD_TODO':
            return {
                completed: false,
                id: v4(),
                text: incomingAction.text,
            };
        case 'TOGGLE_TODO':
            return { ...state, completed: !state.completed };
        default:
            return state;
    }
};
