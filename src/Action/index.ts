import * as api from '../Api';
import { getIsFetching } from '../Reducers/createList';
import { ToggleTodoAction } from './IAction';
import { normalize } from 'normalizr';
import * as Schema from '../Schema/schima';

export const toggleTodo = (id: number): ToggleTodoAction => {
   return {
      id,
      type: 'TOGGLE_TODO',
   };
};

export const addTodo = (text: string) => (dispatch: any) =>
   api.addTodo(text).then((response) => {
      dispatch({
         type: 'ADD_TODO_SUCCESS',
         response: normalize(response, Schema.todo),
      });
   });

export const fetchTodos = (filter: string) => (dispatch: any, getState: any) => {
   if (getIsFetching(getState())) {
      return Promise.resolve;
   }
   dispatch({
      filter,
      type: 'FETCH_TODOS_REQUEST',
   });
   return api.fetchTodos(filter).then(
      (response) => {
         dispatch({
            filter,
            response: normalize(response, Schema.arrayOf),
            type: 'FETCH_TODOS_SUCCESS',
         });
      },
      (error) => {
         dispatch({
            filter,
            message: error.message || 'Something went wrong',
            type: 'FETCH_TODOS_FAILURE',
         });
      },
   );
};
