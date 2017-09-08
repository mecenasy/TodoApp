import * as api from '../Api';
import { Todo } from '../Types/TodoStore';
import { AddTooAction, ReciveTodosAction, RequestTodosAction, ToggleTodoAction } from './IAction';
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

const reciveTodos = (filter: string, response: Todo[]): ReciveTodosAction => {
    return {
        filter,
        response,
        type: 'RECEIVE_TODOS',
    };
};

export const requestTodos = (filter: string): RequestTodosAction => {
    return {
        filter,
        type: 'REQUEST_TODOS',
    };
};

export const fetchTodos = (filter: string) => api.fetchTodos(filter).then((response) => reciveTodos(filter, response));
