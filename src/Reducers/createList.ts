import { combineReducers } from 'redux';
import { FetchTodosFailureAction, FetchTodosRequestAction, FetchTodosSuccessAction } from '../Action/IAction';
type KnowAction = FetchTodosFailureAction | FetchTodosRequestAction | FetchTodosSuccessAction ;

export const createList = (filter: string) => {
   const ids = (state = [], action: any) => {
      switch (action.type) {
         case 'FETCH_TODOS_SUCCESS':
            return action.filter === filter ? action.response.result : state;
         case 'ADD_TODO_SUCCESS':
            return action.filter !== 'complited' ? [...state, action.response.result] : state;
         default:
            return state;
      }
   };
   const isFatching = (state = false, action: KnowAction) => {
      if (action.filter !== filter) {
         return state;
      }
      switch (action.type) {
         case 'FETCH_TODOS_REQUEST':
            return true;
         case 'FETCH_TODOS_SUCCESS':
         case 'FETCH_TODOS_FAILURE':
            return false;
         default:
            return state;
      }
   };
   const errorMessage = (state = null, action: KnowAction) => {
      if (action.filter !== filter) {
         return state;
      }
      switch (action.type) {
         case 'FETCH_TODOS_FAILURE':
            return action.message;
         case 'FETCH_TODOS_SUCCESS':
         case 'FETCH_TODOS_REQUEST':
            return null;
         default:
            return state;
      }
   };
   return combineReducers({
      ids,
      isFatching,
      errorMessage,
   });
};

export const getIds = (state: any) => state.ids;

export const getIsFetching = (state: any) => state.isFatching;

export const getErrorMessage = (state: any) => state.errorMessage;
