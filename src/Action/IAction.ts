
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

export interface ReciveTodosAction {
    type: 'RECEIVE_TODOS',
    filter: string,
    response: Todo[]
}