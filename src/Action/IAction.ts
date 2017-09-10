
import { Todo } from '../Types/TodoStore';

export interface AddTooAction {
    type: 'ADD_TODO',
    id: number,
    text: string,
}
export interface ToggleTodoAction {
    type: 'TOGGLE_TODO',
    id: number,
}

export interface FetchTodosRequestAction {
    type: 'FETCH_TODOS_REQUEST',
    filter: string,
}

export interface FetchTodosSuccessAction {
    type: 'FETCH_TODOS_SUCCESS',
    filter: string,
    response: Todo[],
}
export interface AddTodoSuccessAction {
    type: 'ADD_TODO_SUCCESS',
    filter: string,
    response: Todo,
}
export interface FetchTodosFailureAction {
    filter: string,
    message: string,
    type: 'FETCH_TODOS_FAILURE',
}
