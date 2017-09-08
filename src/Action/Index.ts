import * as api from '../Api';
import { getIsFetching } from '../Reducers/createList';
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

const requestTodos = (filter: string): RequestTodosAction => {
    return {
        filter,
        type: 'REQUEST_TODOS',
    };
};

export const fetchTodos = (filter: string) => (dispatch: any, getState: any) => {
    if (getIsFetching(getState())) {
        return Promise.resolve;
    }
    dispatch(requestTodos(filter));
    return api.fetchTodos(filter).then((response) => dispatch(reciveTodos(filter, response)));
};
