import { combineReducers } from 'redux';
import { todos } from './Todos';
import { filter } from './Visible';

const todoApp = combineReducers({
    filter,
    todos,
  });

export default todoApp;
