import { Todo } from '../Types/TodoStore';
import { AddTooAction, ReciveTodosAction, ToggleTodoAction } from './IAction';

export const toggleTodo = (id: number): ToggleTodoAction => {
    return {
        id,
        type: 'TOGGLE_TODO',
    };
};

let nextId = 0;
export const addTodo = (text: string): AddTooAction => {
    return {
        id: nextId++,
        text,
        type: 'ADD_TODO',
    };
};

export const reciveTodos = (filter: string, response: Todo[]): ReciveTodosAction => {
    return {
        filter,
        response,
        type: 'RECEIVE_TODOS',
    };
};
