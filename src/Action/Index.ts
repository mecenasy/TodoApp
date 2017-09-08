import * as api from '../Api';
import { getIsFetching } from '../Reducers/createList';
// import { Todo } from '../Types/TodoStore';
import { AddTooAction, ToggleTodoAction } from './IAction';

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

export const fetchTodos = (filter: string) => (dispatch: any, getState: any) => {
    if (getIsFetching(getState())) {
        return Promise.resolve;
    }
    dispatch({
        filter,
        type: 'FETCH_TODOS_REQUEST',
    });
    return api.fetchTodos(filter).then(
        (response) => dispatch({
            filter,
            response,
            type: 'FETCH_TODOS_SUCCESS',
        }),
        (error) =>  dispatch({
            filter,
            message: error.message || 'Something went wrong',
            type: 'FETCH_TODOS_FAILURE',
        }),
    );
};
