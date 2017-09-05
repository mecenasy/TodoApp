import { combineReducers } from 'redux';
import * as fromTodos from './Todos';

const todos = fromTodos.todos;

const todoApp = combineReducers({
  todos,
});

export default todoApp;

export const getVisibileFilter = (state: any, filter: string) => fromTodos.getVisibileFilter(state.todos, filter);
